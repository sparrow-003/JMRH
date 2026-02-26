
import React, { useState, useEffect, useMemo } from 'react';
import {
  Download, User, Hash, Lock, Sparkles, Loader2, Calendar,
  FileText, Filter, ListFilter, ArrowUpDown, SortAsc, SortDesc
} from 'lucide-react';
import { MOCK_ARCHIVES } from '../constants';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { askAssistant } from '../services/gemini';
import { supabase } from '../lib/supabase';
import { Article, Issue } from '../types';

type SortField = 'title' | 'author' | 'date';
type SortOrder = 'asc' | 'desc';

const Archives: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [loadingSummaries, setLoadingSummaries] = useState<Record<string, boolean>>({});
  const [archives, setArchives] = useState<Issue[]>(MOCK_ARCHIVES);
  const [isLoading, setIsLoading] = useState(true);

  // Filtering state with localStorage persistence
  const [selectedYear, setSelectedYear] = useState<string>(() => {
    return localStorage.getItem('jmrh_archives_filter_year') || 'All';
  });

  // Sorting state
  const [sortBy, setSortBy] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    fetchArchives();
  }, []);

  // Save selection to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('jmrh_archives_filter_year', selectedYear);
  }, [selectedYear]);

  const fetchArchives = async () => {
    setIsLoading(true);
    try {
      const { data: issuesData, error: issuesError } = await supabase
        .from('issues')
        .select(`
          volume,
          issue_no,
          month,
          year,
          articles:articles(*)
        `)
        .order('year', { ascending: false })
        .order('volume', { ascending: false })
        .order('issue_no', { ascending: false });

      if (issuesData && !issuesError) {
        const formattedArchives: Issue[] = issuesData.map((issue: any) => ({
          volume: issue.volume,
          issueNo: issue.issue_no,
          month: issue.month,
          year: issue.year,
          articles: (issue.articles || []).map((art: any) => ({
            id: art.id,
            title: art.title,
            authors: art.authors || [],
            abstract: art.abstract || '',
            keywords: art.keywords || [],
            pdfUrl: art.pdf_url,
            doi: art.doi,
            pageRange: art.page_range,
            visibility: art.visibility,
            createdAt: art.created_at || new Date().toISOString()
          }))
        }));
        if (formattedArchives.length > 0) setArchives(formattedArchives);
      }
    } catch (err) {
      console.error('Archive fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Derive available years from data
  const availableYears = useMemo(() => {
    const yearStrings = archives.map((i: Issue) => i.year.toString());
    const uniqueYears: string[] = Array.from(new Set(yearStrings));
    return ['All', ...uniqueYears].sort((a: string, b: string) => b.localeCompare(a));
  }, [archives]);

  // Apply filtering and internal article sorting
  const processedArchives = useMemo(() => {
    let result = archives;

    // 1. Filter by year
    if (selectedYear !== 'All') {
      result = archives.filter((issue: Issue) => issue.year.toString() === selectedYear);
    }

    // 2. Sort articles within each issue
    return result.map((issue: Issue) => ({
      ...issue,
      articles: [...issue.articles].sort((a: Article, b: Article) => {
        let comparison = 0;
        if (sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === 'author') {
          comparison = (a.authors[0] || '').localeCompare(b.authors[0] || '');
        } else if (sortBy === 'date') {
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      })
    }));
  }, [archives, selectedYear, sortBy, sortOrder]);

  const handleSummarize = async (article: Article) => {
    if (loadingSummaries[article.id] || summaries[article.id]) return;

    setLoadingSummaries((prev: Record<string, boolean>) => ({ ...prev, [article.id]: true }));

    // Specifically request a 2-sentence technical summary
    const prompt = `
      As a scholarly assistant, provide a strictly 2-sentence technical summary for this research article.
      The summary must be professional, objective, and use academic terminology.
      
      Title: ${article.title}
      Abstract: ${article.abstract || 'No abstract provided.'}
    `;

    const summary = await askAssistant(prompt);
    setSummaries((prev: Record<string, string>) => ({ ...prev, [article.id]: summary || "Scholarly analysis temporarily unavailable." }));
    setLoadingSummaries((prev: Record<string, boolean>) => ({ ...prev, [article.id]: false }));
  };

  const handleDownload = async (article: Article) => {
    if (article.visibility === 'Restricted' && !isAuthenticated) {
      navigate('/login?redirect=/archives');
      return;
    }

    // Log the download if authenticated
    if (isAuthenticated && user) {
      try {
        await supabase.from('download_logs').insert({
          user_id: user.id,
          file_name: article.title,
          timestamp: new Date().toISOString()
        });
      } catch (e) {
        console.error("Log failed:", e);
      }
    }

    if (article.pdfUrl) {
      window.open(article.pdfUrl, '_blank');
    } else {
      alert("Digital asset is currently being indexed and is temporarily unavailable.");
    }
  };

  const toggleSortOrder = () => setSortOrder((prev: SortOrder) => prev === 'asc' ? 'desc' : 'asc');

  return (
    <div className="py-40 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-12 text-center space-y-6">
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] block">Digital Research Repository</span>
          <h1 className="text-5xl md:text-8xl font-serif text-primary tracking-tighter leading-none">Journal <span className="italic font-normal serif text-accent/60">Archives</span></h1>
          <p className="text-slate-400 text-lg font-serif italic max-w-2xl mx-auto leading-relaxed">
            Permanent, open-access preservation of published scholarship, organized by volume and issue.
          </p>
        </header>

        {/* Filters and Controls */}
        <div className="flex flex-col items-center gap-12 mb-24">

          {/* Year Filter */}
          <div className="space-y-6 w-full flex flex-col items-center">
            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              <ListFilter size={14} className="text-accent" />
              Chronological Filter
            </div>
            <div className="flex flex-wrap justify-center gap-3 p-2 bg-white rounded-full border border-accent/10 shadow-sm max-w-full overflow-x-auto no-scrollbar">
              {availableYears.map((year: string) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${selectedYear === year
                    ? 'bg-primary text-white shadow-xl scale-105'
                    : 'bg-transparent text-slate-400 hover:text-primary hover:bg-bg'
                    }`}
                >
                  {year === 'All' ? 'Universal Archive' : year}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex flex-col md:flex-row items-center gap-8 pt-4">
            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              <ArrowUpDown size={14} className="text-accent" />
              Sort Internal Articles
            </div>
            <div className="flex items-center gap-3 bg-white p-1.5 rounded-full border border-accent/5 shadow-sm">
              {[
                { id: 'date', label: 'Date', icon: <Calendar size={12} /> },
                { id: 'title', label: 'Title', icon: <FileText size={12} /> },
                { id: 'author', label: 'Author', icon: <User size={12} /> },
              ].map((option: any) => (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option.id as SortField)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${sortBy === option.id ? 'bg-accent text-white' : 'text-slate-400 hover:bg-bg'
                    }`}
                >
                  {option.icon} {option.label}
                </button>
              ))}
              <div className="w-px h-4 bg-slate-100 mx-2" />
              <button
                onClick={toggleSortOrder}
                className="p-2 text-primary hover:bg-bg rounded-full transition-colors"
                title={`Current order: ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
              >
                {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-accent" size={32} />
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Querying Digital Vaults...</p>
          </div>
        ) : (
          <div className="space-y-32">
            <AnimatePresence mode="popLayout">
              {processedArchives.length > 0 ? processedArchives.map((issue) => (
                <motion.div
                  key={`${issue.volume}-${issue.issueNo}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-12"
                >
                  <div className="flex items-center gap-8 border-b border-accent/10 pb-8">
                    <div className="w-16 h-16 bg-primary text-white flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-serif font-bold italic">{issue.volume}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-serif text-primary font-medium">Volume {issue.volume}, Issue {issue.issueNo}</h2>
                        <span className="text-[8px] font-bold text-slate-300 bg-slate-50 px-3 py-1 border border-slate-100 rounded-full tracking-widest uppercase">
                          {issue.articles.length} Articles
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-1 flex items-center gap-2">
                        <Calendar size={12} className="text-accent" /> {issue.month} {issue.year}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {issue.articles.length > 0 ? issue.articles.map((article) => (
                      <motion.div
                        key={article.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 border border-accent/5 hover:border-accent/20 transition-all group"
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-10">
                          <div className="space-y-6 flex-grow">
                            <div className="flex items-center gap-4">
                              <span className="text-[8px] font-bold text-accent bg-accent/5 px-4 py-1 border border-accent/10 uppercase tracking-widest">Article PDF</span>
                              {article.doi && <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">DOI: {article.doi}</span>}
                            </div>

                            <h3 className="text-2xl font-serif text-primary leading-tight font-medium group-hover:text-accent transition-colors">
                              {article.title}
                            </h3>

                            {/* Scholar Insight Section */}
                            <AnimatePresence>
                              {summaries[article.id] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-6 bg-accent/5 border-l-2 border-accent italic text-slate-500 text-sm leading-relaxed my-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Sparkles size={14} className="text-accent" />
                                      <span className="text-[9px] font-bold uppercase tracking-widest text-accent/60">Scholar Insight (AI Synthesis)</span>
                                    </div>
                                    "{summaries[article.id]}"
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div className="flex flex-wrap items-center gap-6 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                              <span className="flex items-center gap-2">
                                <User size={14} className="text-accent" /> {article.authors.join(', ')}
                              </span>
                              <span>Page: {article.pageRange}</span>
                              <span className="flex items-center gap-2">
                                <Calendar size={14} className="text-slate-200" /> Published: {new Date(article.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            {!summaries[article.id] && (
                              <button
                                onClick={() => handleSummarize(article)}
                                disabled={loadingSummaries[article.id]}
                                className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors disabled:opacity-50"
                              >
                                {loadingSummaries[article.id] ? (
                                  <Loader2 size={12} className="animate-spin" />
                                ) : (
                                  <Sparkles size={12} />
                                )}
                                {loadingSummaries[article.id] ? 'Generating Insight...' : 'Get Scholar Insight'}
                              </button>
                            )}
                          </div>

                          <div className="flex flex-col justify-center items-end shrink-0">
                            <button
                              onClick={() => handleDownload(article)}
                              className="btn-premium flex items-center gap-3"
                            >
                              <Download size={14} /> Download PDF
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )) : (
                      <div className="p-16 text-center border border-dashed border-accent/10">
                        <p className="text-slate-300 font-serif italic">No articles indexed for this issue yet.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-32 border border-dashed border-accent/10">
                  <p className="text-slate-300 font-serif italic text-xl">No issues found for the selected year.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Archives;
// Updated for git commit
