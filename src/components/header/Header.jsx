import React, { useState, useEffect, useRef } from 'react';
import {
  Newspaper,
  Search,
  Menu,
  X,
  Home,
  Info,
  Phone,
  ChevronUp,
  Sparkles,
  Brain,
  Zap,
  MessageSquare,
  Loader2
} from 'lucide-react';

// API Keys - NOTE: In a real-world application, these should be stored securely as environment variables.
const NEWS_API_KEY = 'b68f196e71924bf2b554095ce82b8df3';
const THE_NEWS_API_KEY = '4FX3UCcFY7cFIPEKdYyrIXWo7sUqNeGYQeNlLHg6';
const NEWS_DATA_API_KEY = 'pub_6e2134af24664fd3967c17622b1882ee';

/**
 * Header component for the BeritaAI news portal.
 * Handles navigation, a search bar with real-time results from multiple APIs,
 * and responsive design for mobile and desktop.
 */
const Header = () => {
  // State to manage UI elements and data
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  
  // Debounce state to prevent excessive API calls on every keystroke
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  // Effect to handle the debouncing of the search query
  useEffect(() => {
    // Set a timer to update the debounced query after 500ms of no typing
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    // Cleanup function to clear the timer if the component unmounts or query changes
    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  // Effect to handle window scroll events for header styling and "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      // Change header style when scrolled down
      setIsScrolled(scrollTop > 10);
      // Show "back to top" button when scrolled past a certain point
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to fetch search results from all APIs whenever the debounced query changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      const query = debouncedSearchQuery.trim();
      if (query === '') {
        setSearchResults([]);
        setSearchError(null);
        return;
      }

      setIsSearching(true);
      setSearchError(null);

      try {
        // Use Promise.allSettled to fetch from all 3 APIs simultaneously.
        // This ensures that even if one API fails, the others will still be processed.
        const [newsApiResults, theNewsApiResults, newsDataResults] = await Promise.allSettled([
          // NewsAPI fetch request
          fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=5&apiKey=${NEWS_API_KEY}`)
            .then(res => res.ok ? res.json() : Promise.reject('NewsAPI failed')),
          
          // TheNewsAPI fetch request
          fetch(`https://api.thenewsapi.com/v1/news/all?api_token=${THE_NEWS_API_KEY}&language=en&search=${encodeURIComponent(query)}&limit=5`)
            .then(res => res.ok ? res.json() : Promise.reject('TheNewsAPI failed')),
          
          // NewsData.io fetch request
          fetch(`https://newsdata.io/api/1/latest?apikey=${NEWS_DATA_API_KEY}&q=${encodeURIComponent(query)}&language=en&size=5`)
            .then(res => res.ok ? res.json() : Promise.reject('NewsData.io failed'))
        ]);

        let combinedResults = [];

        // Process NewsAPI results if the promise was fulfilled successfully
        if (newsApiResults.status === 'fulfilled') {
          const articles = newsApiResults.value.articles || [];
          combinedResults = combinedResults.concat(
            articles.map(article => ({
              title: article.title,
              url: article.url,
              publishedAt: article.publishedAt,
              source: 'NewsAPI',
              image: article.urlToImage
            }))
          );
        }

        // Process TheNewsAPI results if the promise was fulfilled
        if (theNewsApiResults.status === 'fulfilled') {
          const data = theNewsApiResults.value.data || [];
          combinedResults = combinedResults.concat(
            data.map(article => ({
              title: article.title,
              url: article.url,
              publishedAt: article.published_at,
              source: 'TheNewsAPI',
              image: article.image_url
            }))
          );
        }

        // Process NewsData.io results if the promise was fulfilled
        if (newsDataResults.status === 'fulfilled') {
          const results = newsDataResults.value.results || [];
          combinedResults = combinedResults.concat(
            results.map(article => ({
              title: article.title,
              url: article.link,
              publishedAt: article.pubDate,
              source: 'NewsData.io',
              image: article.image_url
            }))
          );
        }

        // Filter out duplicates based on URL and limit to a maximum of 5 results
        const uniqueResults = [...new Map(
          combinedResults
            .filter(item => item.title && item.title.toLowerCase().includes(query.toLowerCase()))
            .map(item => [item.url, item])
        ).values()].slice(0, 5);

        setSearchResults(uniqueResults);

        // Set an error message if no results were found
        if (uniqueResults.length === 0) {
          setSearchError('Tidak ada berita yang relevan ditemukan.');
        }

      } catch (error) {
        console.error('Search error:', error);
        setSearchError('Gagal melakukan pencarian. Silakan coba lagi.');
      } finally {
        setIsSearching(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearchQuery]);

  // Function to scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Function to toggle the mobile menu's open/close state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to clear the search input and results
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchError(null);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Helper function to format the date string to a readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Tanggal tidak valid';
      
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      console.error('Date formatting error:', e);
      return 'Tanggal tidak valid';
    }
  };

  // List of navigation items
  const navItems = [
    { name: 'Home', icon: Home, href: '#home' },
    { name: 'About', icon: Info, href: '#about' },
    { name: 'News', icon: Newspaper, href: '#news' },
    { name: 'Testimoni', icon: MessageSquare, href: '#testimonials' },
    { name: 'Contact', icon: Phone, href: '#contact' },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-blue-200 py-2'
            : 'bg-gradient-to-r from-blue-100/5 via-teal-100/10 to-highlight/5 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">

            {/* Logo Section */}
            <div className="flex items-center space-x-3 group animate-fade-in-down">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-teal-500 to-yellow-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

                <div className="relative bg-gradient-to-br from-blue-500 via-teal-500 to-yellow-500 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                  <div className="relative">
                    <Newspaper className="h-5 w-5 lg:h-7 lg:w-7 text-white relative z-10" />
                    <Brain className="absolute -top-1 -right-1 h-3 w-3 text-white/80 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Brand text */}
              <div className="hidden sm:block group-hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-500 via-teal-500 to-yellow-500 bg-clip-text text-transparent">
                    BeritaAI
                  </h1>
                  <Zap className="h-4 w-4 text-yellow-500 animate-bounce" />
                </div>
                <div className="flex items-center space-x-1 -mt-1">
                  <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" />
                  <span className="text-xs text-gray-600 font-medium tracking-wide">
                    AI Powered News Portal
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2 animate-fade-in-down animation-delay-200">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group relative flex items-center space-x-2 px-5 py-2.5 rounded-2xl transition-all duration-500 hover:bg-gray-100 hover:scale-105 hover:shadow-lg"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <item.icon className="h-4 w-4 text-gray-600 group-hover:text-blue-500 transition-all duration-300 group-hover:scale-110" />
                  <span className="text-gray-700 font-medium group-hover:text-blue-500 transition-colors duration-300">
                    {item.name}
                  </span>

                  {/* Animated underline */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 group-hover:w-3/4 transition-all duration-500"></div>
                </a>
              ))}
            </div>

            {/* Search & Mobile Controls */}
            <div className="flex items-center space-x-3 animate-fade-in-down animation-delay-400">

              {/* Desktop Search */}
              <div className="hidden md:flex items-center relative group">
                <div className={`relative transition-all duration-500 ${searchQuery ? 'scale-105' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-teal-200 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Cari berita AI..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-11 pr-10 py-2.5 w-72 bg-white/90 backdrop-blur border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-500 placeholder:text-gray-400 hover:shadow-md text-gray-900"
                    />
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {/* Search Results Dropdown */}
                  {searchQuery && (
                    <div className="absolute top-full mt-3 w-full bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                      {isSearching ? (
                        <div className="p-4 text-center text-gray-500 flex items-center justify-center">
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          <span>Mencari berita...</span>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <>
                          {searchResults.map((result, index) => (
                            <a
                              key={index}
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-5 py-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 group"
                            >
                              <div className="flex items-start space-x-3">
                                {result.image && (
                                  <img
                                    src={result.image}
                                    alt={result.title}
                                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    {result.title}
                                  </h4>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                      {result.source}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {formatDate(result.publishedAt)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </a>
                          ))}
                          <div className="p-3 bg-gray-50 text-center">
                            <span className="text-xs text-gray-500">
                              Menampilkan {searchResults.length} hasil pencarian
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          {searchError || 'Tidak ada berita yang ditemukan.'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2.5 text-gray-600 hover:text-blue-500 transition-all duration-500 hover:bg-gradient-to-r hover:from-blue-100 hover:to-teal-100 rounded-xl hover:scale-110 hover:shadow-lg"
              >
                <div className="relative">
                  {isMenuOpen ? (
                    <X className="h-6 w-6 transform rotate-180 transition-transform duration-300" />
                  ) : (
                    <Menu className="h-6 w-6 transition-transform duration-300" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation and Search */}
          <div className={`lg:hidden transition-all duration-700 ease-out ${
            isMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
          } overflow-hidden`}>
            <div className="py-6 space-y-3">

              {/* Mobile Search Input */}
              <div className="mb-6 animate-fade-in-up relative">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-teal-100/50 rounded-2xl blur opacity-50"></div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Cari berita AI..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-11 pr-10 py-2.5 w-full bg-white/90 backdrop-blur border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-500 placeholder:text-gray-400 hover:shadow-md text-gray-900"
                    />
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {/* Mobile Search Results Dropdown */}
                  {searchQuery && (
                    <div className="absolute top-full mt-3 w-full bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
                      {isSearching ? (
                        <div className="p-4 text-center text-gray-500 flex items-center justify-center">
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          <span>Mencari berita...</span>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <>
                          {searchResults.map((result, index) => (
                            <a
                              key={index}
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
                                {result.title}
                              </h4>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  {result.source}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {formatDate(result.publishedAt)}
                                </span>
                              </div>
                            </a>
                          ))}
                        </>
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          {searchError || 'Tidak ada berita yang ditemukan.'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Navigation Links */}
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-teal-100 hover:text-blue-500 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <ChevronUp className="h-6 w-6" />
      </button>
    </>
  );
};

export default Header;
