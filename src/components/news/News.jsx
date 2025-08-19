// src/components/news/News.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ExternalLink, Search, X, Loader2 } from 'lucide-react';

const News = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndices, setCurrentIndices] = useState({ api1: 0, api2: 0, api3: 0 });
  const [newsByApi, setNewsByApi] = useState({ api1: [], api2: [], api3: [] });

  // Fetch news from multiple APIs
  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        setLoading(true);
        setError(null);

        // API 1: NewsAPI
        const newsApiResponse = await fetch(
          'https://newsapi.org/v2/everything?q=artificial+intelligence+ai&sortBy=publishedAt&pageSize=12&apiKey=b68f196e71924bf2b554095ce82b8df3'
        );

        // API 2: TheNewsAPI
        const theNewsApiResponse = await fetch(
          'https://api.thenewsapi.com/v1/news/all?api_token=4FX3UCcFY7cFIPEKdYyrIXWo7sUqNeGYQeNlLHg6&language=en&search=ai&limit=12'
        );

        // API 3: World News API
        // Menggantikan NewsData.io
        const worldNewsResponse = await fetch(
          'https://api.worldnewsapi.com/search-news?text=artificial+intelligence+ai&language=en&number=12&api-key=37d794bd9d184b6e868c948c7fc0136b'
        );

        // Check for response success for all APIs
        const responses = await Promise.all([
          newsApiResponse,
          theNewsApiResponse,
          worldNewsResponse
        ]);

        const newsApiData = responses[0].ok ? await responses[0].json() : { articles: [] };
        const theNewsApiData = responses[1].ok ? await responses[1].json() : { data: [] };
        const worldNewsData = responses[2].ok ? await responses[2].json() : { news: [] };
        
        // Cek apakah semua API gagal
        if (!responses[0].ok && !responses[1].ok && !responses[2].ok) {
          throw new Error('Semua API berita gagal memuat. Silakan coba lagi nanti.');
        }

        setNewsByApi({
          api1: newsApiData.articles || [],
          api2: theNewsApiData.data || [],
          api3: worldNewsData.news || []
        });

        // Combine all news
        const allNews = [
          ...(newsApiData.articles || []).map(item => ({ 
            ...item, 
            apiSource: 'NewsAPI',
            image_url: item.urlToImage,
            published_at: item.publishedAt
          })),
          ...(theNewsApiData.data || []).map(item => ({ 
            ...item, 
            apiSource: 'TheNewsAPI',
            url: item.url,
            description: item.description || 'Tidak ada deskripsi yang tersedia.'
          })),
          ...(worldNewsData.news || []).map(item => ({ 
            ...item, 
            apiSource: 'WorldNewsAPI',
            title: item.title,
            url: item.url,
            image_url: item.image,
            published_at: item.publish_date,
            description: item.text || 'Tidak ada deskripsi yang tersedia.'
          }))
        ];

        setNews(allNews);
        setFilteredNews(allNews);

      } catch (err) {
        setError(err.message);
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  // Filter news based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredNews(news);
    } else {
      const filtered = news.filter(article => 
        article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  }, [searchQuery, news]);

  // Navigation functions for each API section
  const nextSlide = (apiKey) => {
    setCurrentIndices(prev => ({
      ...prev,
      [apiKey]: (prev[apiKey] + 1) % Math.ceil((newsByApi[apiKey]?.length || 0) / 4)
    }));
  };

  const prevSlide = (apiKey) => {
    setCurrentIndices(prev => ({
      ...prev,
      [apiKey]: prev[apiKey] === 0 ? Math.ceil((newsByApi[apiKey]?.length || 0) / 4) - 1 : prev[apiKey] - 1
    }));
  };

  const goToSlide = (apiKey, index) => {
    setCurrentIndices(prev => ({
      ...prev,
      [apiKey]: index
    }));
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Tanggal tidak valid';
      
      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch {
      return 'Tanggal tidak valid';
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Get unique categories for badges
  const getCategoryBadge = (apiSource) => {
    const colors = {
      'NewsAPI': 'bg-blue-100 text-blue-800',
      'TheNewsAPI': 'bg-green-100 text-green-800',
      'WorldNewsAPI': 'bg-yellow-100 text-yellow-800'
    };
    
    return colors[apiSource] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <section className="py-16 bg-secondary min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-700">Memuat berita terbaru...</p>
        </div>
      </section>
    );
  }

  if (error && news.length === 0) {
    return (
      <section className="py-16 bg-secondary min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">Error: Gagal memuat berita</p>
          <p className="text-sm mt-2">Silakan refresh halaman atau coba lagi nanti.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-16 bg-secondary min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Berita <span className="text-primary">AI</span> Terkini
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Dapatkan informasi terbaru tentang perkembangan kecerdasan buatan dari berbagai sumber terpercaya
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari berita AI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm text-gray-900 bg-white placeholder-gray-500"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* News Sections */}
        {searchQuery ? (
          // Search Results
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredNews.map((article, index) => (
              <NewsCard key={index} article={article} getCategoryBadge={getCategoryBadge} formatDate={formatDate} />
            ))}
          </motion.div>
        ) : (
          // Individual API Sections
          <>
            {/* NewsAPI Section */}
            {newsByApi.api1 && newsByApi.api1.length > 0 && (
              <NewsSection 
                title="Berita AI Global"
                news={newsByApi.api1}
                apiKey="api1"
                currentIndex={currentIndices.api1}
                onNext={() => nextSlide('api1')}
                onPrev={() => prevSlide('api1')}
                onGoTo={(index) => goToSlide('api1', index)}
                getCategoryBadge={getCategoryBadge}
                formatDate={formatDate}
              />
            )}

            {/* TheNewsAPI Section */}
            {newsByApi.api2 && newsByApi.api2.length > 0 && (
              <NewsSection 
                title="Berita AI Terkini"
                news={newsByApi.api2}
                apiKey="api2"
                currentIndex={currentIndices.api2}
                onNext={() => nextSlide('api2')}
                onPrev={() => prevSlide('api2')}
                onGoTo={(index) => goToSlide('api2', index)}
                getCategoryBadge={getCategoryBadge}
                formatDate={formatDate}
              />
            )}

            {/* World News API Section */}
            {newsByApi.api3 && newsByApi.api3.length > 0 && (
              <NewsSection 
                title="Update AI Terbaru"
                news={newsByApi.api3}
                apiKey="api3"
                currentIndex={currentIndices.api3}
                onNext={() => nextSlide('api3')}
                onPrev={() => prevSlide('api3')}
                onGoTo={(index) => goToSlide('api3', index)}
                getCategoryBadge={getCategoryBadge}
                formatDate={formatDate}
              />
            )}
          </>
        )}

        {/* Empty State */}
        {filteredNews.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Tidak ada berita yang ditemukan untuk pencarian Anda.</p>
          </div>
        )}
      </div>
    </section>
  );
};

// News Section Component
const NewsSection = ({ title, news, apiKey, currentIndex, onNext, onPrev, onGoTo, getCategoryBadge, formatDate }) => {
  if (!news || news.length === 0) return null;

  const totalSlides = Math.ceil(news.length / 4);
  const visibleNews = news.slice(currentIndex * 4, (currentIndex + 1) * 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-16 relative"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        {news.length > 4 && (
          <>
            <button
              onClick={onPrev}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Previous news"
            >
              <ChevronLeft className="h-6 w-6 text-primary" />
            </button>
            <button
              onClick={onNext}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Next news"
            >
              <ChevronRight className="h-6 w-6 text-primary" />
            </button>
          </>
        )}

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {visibleNews.map((article, index) => (
              <NewsCard 
                key={`${apiKey}-${currentIndex}-${index}`} 
                article={article} 
                getCategoryBadge={getCategoryBadge} 
                formatDate={formatDate} 
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination Indicators */}
      {news.length > 4 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onGoTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-primary scale-110' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

// News Card Component
const NewsCard = ({ article, getCategoryBadge, formatDate }) => {
  const [imageError, setImageError] = useState(false);

  const getImageUrl = () => {
    if (imageError) return '/placeholder-news.jpg';
    if (article.urlToImage) return article.urlToImage;
    if (article.image_url) return article.image_url;
    if (article.image) return article.image; // Added for World News API
    return '/placeholder-news.jpg';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden border border-gray-100 group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageUrl()}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadge(article.apiSource)}`}>
          {article.apiSource}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{formatDate(article.publishedAt || article.published_at)}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
          {article.description || article.text || 'Tidak ada deskripsi yang tersedia.'}
        </p>

        <div className="mt-auto">
          <a
            href={article.url || article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-300 group-hover:shadow-md"
          >
            <span className="text-sm font-semibold">Baca Selengkapnya</span>
            <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default News;
