'use client';

import {
    Play,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Clock,
    Loader2,
    Zap
} from 'lucide-react';
import { useApp } from './context';
import { useState, useCallback } from 'react';

interface TaskRunState {
    status: 'pending' | 'running' | 'passed' | 'failed';
    runId?: string;
    metrics?: {
        asrLatency?: number;
        llmTTF?: number;
        ttsLatency?: number;
        e2eLatency?: number;
    };
}

export function EvalRunner() {
    const { tasks, suites, runEval, refreshTasks, refreshDashboard } = useApp();
    const [running, setRunning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [selectedSuite, setSelectedSuite] = useState<string | null>(null);
    const [taskStates, setTaskStates] = useState<Record<string, TaskRunState>>({});
    const [completedCount, setCompletedCount] = useState(0);

    // Poll for run status
    const pollRunStatus = useCallback(async (runId: string): Promise<{ status: string; metrics?: TaskRunState['metrics'] }> => {
        const maxAttempts = 30; // 30 seconds max
        for (let i = 0; i < maxAttempts; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            try {
                const res = await fetch(`/api/eval/run?id=${runId}`);
                if (!res.ok) continue;
                const data = await res.json();
                if (data.status !== 'running') {
                    return {
                        status: data.status,
                        metrics: {
                            asrLatency: data.asrLatency,
                            llmTTF: data.llmTTF,
                            ttsLatency: data.ttsLatency,
                            e2eLatency: data.e2eLatency,
                        }
                    };
                }
            } catch (e) {
                console.error('Polling error:', e);
            }
        }
        return { status: 'failed' };
    }, []);

    // Run single task
    const handleRunTask = useCallback(async (taskId: string) => {
        setTaskStates(prev => ({
            ...prev,
            [taskId]: { status: 'running' }
        }));

        try {
            const runId = await runEval(taskId, 'mock');
            setTaskStates(prev => ({
                ...prev,
                [taskId]: { status: 'running', runId }
            }));

            const result = await pollRunStatus(runId);
            setTaskStates(prev => ({
                ...prev,
                [taskId]: {
                    status: result.status as 'passed' | 'failed',
                    runId,
                    metrics: result.metrics
                }
            }));

            refreshTasks();
            refreshDashboard();
            return result.status === 'passed';
        } catch (error) {
            console.error('Run task error:', error);
            setTaskStates(prev => ({
                ...prev,
                [taskId]: { status: 'failed' }
            }));
            return false;
        }
    }, [runEval, pollRunStatus, refreshTasks, refreshDashboard]);

    // Run all tasks sequentially
    const handleRunAll = async () => {
        setRunning(true);
        setProgress(0);
        setCompletedCount(0);
        setTaskStates({});

        const total = tasks.length;
        let completed = 0;

        for (const task of tasks) {
            await handleRunTask(task.id);
            completed++;
            setCompletedCount(completed);
            setProgress(Math.round((completed / total) * 100));
        }

        setRunning(false);
        refreshDashboard();
    };

    // Reset all states
    const handleReset = () => {
        setProgress(0);
        setRunning(false);
        setTaskStates({});
        setCompletedCount(0);
    };

    // Get task status for display
    const getTaskStatus = (taskId: string) => {
        return taskStates[taskId]?.status || 'pending';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">运行评测</h1>
                    <p className="text-[var(--muted)] mt-1">执行评测任务并查看实时进度</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleReset}
                        disabled={running}
                        className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--card-hover)] transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <RotateCcw className="w-4 h-4" />
                        重置
                    </button>
                    <button
                        onClick={handleRunAll}
                        disabled={running || tasks.length === 0}
                        className="btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                        {running ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                运行中...
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4" />
                                运行全部
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Progress */}
            {(running || progress > 0) && (
                <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">评测进度</span>
                        <span className="text-[var(--primary)]">{progress}%</span>
                    </div>
                    <div className="h-3 bg-[var(--border)] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-[var(--muted)]">
                        <span>已完成: {completedCount} / {tasks.length} 任务</span>
                        <span>{running ? '正在执行评测...' : '评测完成'}</span>
                    </div>
                </div>
            )}

            {/* Suites Grid */}
            {suites.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                    {suites.map((suite) => (
                        <div
                            key={suite.id}
                            onClick={() => setSelectedSuite(selectedSuite === suite.id ? null : suite.id)}
                            className={`glass-card p-5 cursor-pointer transition-all ${selectedSuite === suite.id ? 'border-[var(--primary)] ring-1 ring-[var(--primary)]' : ''
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold">{suite.name}</h3>
                                <span className={`badge ${suite.status === 'healthy' ? 'badge-success' :
                                    suite.status === 'warning' ? 'badge-warning' : 'badge-danger'
                                    }`}>
                                    {suite.status === 'healthy' ? '健康' :
                                        suite.status === 'warning' ? '注意' : '饱和'}
                                </span>
                            </div>
                            <p className="text-sm text-[var(--muted)] mb-4">{suite.description}</p>
                            <div className="flex items-center justify-between text-sm">
                                <span>{suite.taskCount} 个任务</span>
                                <span className="text-[var(--primary)]">{suite.passRate}%</span>
                            </div>
                            <div className="progress-bar mt-2">
                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${suite.passRate}%`,
                                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Task List */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">任务列表</h3>
                    <span className="text-sm text-[var(--muted)]">{tasks.length} 个任务</span>
                </div>

                {tasks.length === 0 ? (
                    <div className="text-center py-12 text-[var(--muted)]">
                        <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>暂无评测任务</p>
                        <p className="text-sm mt-1">请先在任务管理中创建任务</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {tasks.map((task, index) => {
                            const status = getTaskStatus(task.id);
                            const taskState = taskStates[task.id];

                            return (
                                <div
                                    key={task.id}
                                    className="flex items-center justify-between p-4 rounded-lg bg-[var(--card-hover)]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-[var(--card)] flex items-center justify-center text-sm font-medium">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <div className="font-medium">{task.name}</div>
                                            <div className="text-sm text-[var(--muted)]">
                                                {task.category}
                                                {taskState?.metrics?.e2eLatency && (
                                                    <span className="ml-2 text-emerald-400">
                                                        <Zap className="w-3 h-3 inline mr-1" />
                                                        {Math.round(taskState.metrics.e2eLatency)}ms
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-[var(--muted)]">{task.trials} 试验</span>

                                        {/* Status Icon */}
                                        {status === 'running' ? (
                                            <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                                        ) : status === 'passed' ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                        ) : status === 'failed' ? (
                                            <XCircle className="w-5 h-5 text-red-400" />
                                        ) : (
                                            <Clock className="w-5 h-5 text-[var(--muted)]" />
                                        )}

                                        {/* Run Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRunTask(task.id);
                                            }}
                                            disabled={running || status === 'running'}
                                            className="px-3 py-1.5 text-sm bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50 flex items-center gap-1.5"
                                        >
                                            {status === 'running' ? (
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            ) : (
                                                <Play className="w-3.5 h-3.5" />
                                            )}
                                            运行
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
