#!/usr/bin/env python3
"""
Hybrid search combining arXiv and Google Scholar
"""

import sys
import json
import time
from scholarly import scholarly
from datetime import datetime

KEYWORDS = [
    'voice agent', 'conversational AI', 'speech dialogue',
    'full-duplex speech', 'speech-to-speech',
    'PersonaPlex', 'GPT-4o voice', 'Gemini voice',
    'voice cloning', 'zero-shot TTS', 'neural codec'
]

def search_google_scholar_recent(keywords, year_from=2024, max_per_keyword=5):
    """Search Google Scholar for recent papers"""
    all_papers = []
    
    for keyword in keywords:
        try:
            query = f'{keyword} {year_from}'
            print(f'Searching Google Scholar: {query}', file=sys.stderr)
            
            search_query = scholarly.search_pubs(query)
            count = 0
            
            for _ in range(max_per_keyword):
                try:
                    paper = next(search_query)
                    bib = paper.get('bib', {})
                    
                    year = bib.get('pub_year', '')
                    if year and int(year) >= year_from:
                        all_papers.append({
                            'id': f"scholar_{hash(bib.get('title', ''))}",
                            'title': bib.get('title', ''),
                            'authors': ', '.join(bib.get('author', [])),
                            'abstract': bib.get('abstract', '')[:500],
                            'year': year,
                            'url': paper.get('pub_url', ''),
                            'source': 'google_scholar',
                            'discoveredAt': datetime.now().isoformat()
                        })
                        count += 1
                    
                    time.sleep(3)  # Rate limiting
                    
                except StopIteration:
                    break
                except Exception as e:
                    print(f'Error fetching paper: {e}', file=sys.stderr)
                    time.sleep(5)
                    continue
            
            print(f'Found {count} papers for "{keyword}"', file=sys.stderr)
            time.sleep(5)  # Longer delay between keywords
            
        except Exception as e:
            print(f'Search error for "{keyword}": {e}', file=sys.stderr)
            time.sleep(10)
            continue
    
    return all_papers

if __name__ == '__main__':
    year_from = int(sys.argv[1]) if len(sys.argv) > 1 else 2024
    papers = search_google_scholar_recent(KEYWORDS, year_from=year_from, max_per_keyword=3)
    
    # Deduplicate by title
    seen_titles = set()
    unique_papers = []
    for paper in papers:
        title_lower = paper['title'].lower()
        if title_lower not in seen_titles:
            seen_titles.add(title_lower)
            unique_papers.append(paper)
    
    print(json.dumps(unique_papers, indent=2))
    print(f'\nTotal unique papers: {len(unique_papers)}', file=sys.stderr)
