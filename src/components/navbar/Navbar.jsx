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

// API Keys - Ganti dengan key Anda jika perlu
const NEWS_API_KEY = 'b68f196e71924bf2b554095ce82b8df3';
const THE_NEWS_API_KEY = '4FX3UCcFY7cFIPEKdYyrIXWo7sUqNeGYQeNlLHg6';

const Navbar = () => {
  // State to manage UI visibility and data
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Debounce state for search to prevent excessive API calls
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  
  // Ref for the search container to handle clicks outside
  const searchContainerRef = useRef(null);

  // Effect for debouncing the search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms debounce time
    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  // Effect to handle scroll events for navbar and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 10);
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to handle clicks outside the search results dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
        // Clear search results after a short delay
        setTimeout(() => setSearchResults([]), 200);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  // Function to fetch news from the two APIs
  const fetchNews = async () => {
    if (debouncedSearchQuery.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setSearchResults([]);

    try {
      const [newsApiRes, theNewsApiRes] = await Promise.all([
        fetch(`https://newsapi.org/v2/everything?q=${debouncedSearchQuery}&language=en&pageSize=3&apiKey=${NEWS_API_KEY}`),
        fetch(`https://api.thenewsapi.com/v1/news/all?search=${debouncedSearchQuery}&language=en&limit=3&api_token=${THE_NEWS_API_KEY}`)
      ]);

      const newsApiData = newsApiRes.ok ? await newsApiRes.json() : { articles: [] };
      const theNewsApiData = theNewsApiRes.ok ? await theNewsApiRes.json() : { data: [] };

      // Combine and format the results from both APIs
      const combinedResults = [
        ...(newsApiData.articles || []).slice(0, 3).map(article => ({
          title: article.title,
          url: article.url,
          publishedAt: article.publishedAt
        })),
        ...(theNewsApiData.data || []).map(article => ({
          title: article.title,
          url: article.url,
          publishedAt: article.published_at
        }))
      ];

      // Limit to 3 results in total to prevent clutter
      setSearchResults(combinedResults.slice(0, 3));

      if (combinedResults.length === 0) {
        setSearchError('Tidak ada berita ditemukan.');
      }

    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchError('Gagal memuat hasil pencarian.');
    } finally {
      setIsSearching(false);
    }
  };

  // Effect to trigger news fetch when the debounced query changes
  useEffect(() => {
    fetchNews();
  }, [debouncedSearchQuery]);

  // Function to smoothly scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Function to toggle the mobile menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Function to handle link clicks and close the menu
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Navigation items data
  const navItems = [
    { 
      name: 'Home', 
      icon: Home, 
      href: '#home',
      description: 'Beranda utama'
    },
    { 
      name: 'About', 
      icon: Info, 
      href: '#about',
      description: 'Tentang kami'
    },
    { 
      name: 'News', 
      icon: Newspaper, 
      href: '#news',
      description: 'Berita terkini'
    },
    {
      name: 'Testimoni',
      icon: MessageSquare,
      href: '#testimonials',
      description: 'Apa kata mereka'
    },
    { 
      name: 'Contact', 
      icon: Phone, 
      href: '#contact',
      description: 'Hubungi kami'
    },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-primary/20 py-2' 
            : 'bg-gradient-to-r from-primary/5 via-secondary/10 to-accent/5 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-3 group animate-fade-in-down">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-highlight rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                
                {/* Main icon container */}
                <div className="relative bg-gradient-to-br from-primary via-accent to-highlight p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                  <div className="relative">
                    <Newspaper className="h-5 w-5 lg:h-7 lg:w-7 text-white relative z-10" />
                    <Brain className="absolute -top-1 -right-1 h-3 w-3 text-white/80 animate-pulse" />
                  </div>
                </div>
              </div>
              
              {/* Brand text */}
              <div className="hidden sm:block group-hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary via-accent to-highlight bg-clip-text text-transparent">
                    BeritaAI
                  </h1>
                  <Zap className="h-4 w-4 text-accent animate-bounce" />
                </div>
                <div className="flex items-center space-x-1 -mt-1">
                  <Sparkles className="h-3 w-3 text-accent animate-pulse" />
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
                  className="group relative flex items-center space-x-2 px-5 py-2.5 rounded-2xl transition-all duration-500 hover:bg-gradient-to-r hover:from-primary/10 hover:via-accent/10 hover:to-highlight/10 hover:scale-105 hover:shadow-lg"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <item.icon className="h-4 w-4 text-gray-600 group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
                  <span className="text-gray-700 font-medium group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </span>
                  
                  {/* Animated underline */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-3/4 transition-all duration-500"></div>
                  
                  {/* Tooltip */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                    {item.description}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                </a>
              ))}
            </div>

            {/* Search & Mobile Controls */}
            <div className="flex items-center space-x-3 animate-fade-in-down animation-delay-400">
              
              {/* Desktop Search */}
              <div className="hidden md:flex items-center relative group" ref={searchContainerRef}>
                <div className={`relative transition-all duration-500 ${isSearchFocused ? 'scale-105' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-primary transition-colors duration-300" />
                    <input
                      type="text"
                      placeholder="Cari berita AI..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      className="pl-11 pr-5 py-2.5 w-72 bg-white/90 backdrop-blur border border-primary/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white transition-all duration-500 placeholder:text-gray-400 hover:shadow-md"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {/* Search Results Dropdown */}
                  {isSearchFocused && searchQuery && (
                    <div className="absolute top-full mt-3 w-full bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-20">
                      {isSearching ? (
                        <div className="p-4 flex items-center justify-center text-gray-500">
                          <Loader2 className="animate-spin h-5 w-5 mr-2" />
                          <span>Mencari...</span>
                        </div>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                          <a
                            key={index}
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-5 py-3 hover:bg-gray-100 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                          >
                            <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">{result.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(result.publishedAt).toLocaleDateString()}
                            </p>
                          </a>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          {searchError || 'Tidak ada hasil.'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Search Button */}
              {/* <button onClick={() => {
                setIsMenuOpen(false);
                setSearchQuery('');
              }} className="md:hidden p-2.5 text-gray-600 hover:text-primary transition-all duration-300 hover:bg-primary/10 rounded-xl hover:scale-110">
                <Search className="h-5 w-5" />
              </button> */}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2.5 text-gray-600 hover:text-primary transition-all duration-500 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 rounded-xl hover:scale-110 hover:shadow-lg"
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

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-700 ease-out ${
            isMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
          } overflow-hidden`}>
            <div className="py-6 space-y-3">
              
              {/* Mobile Search - integrated into menu */}
              <div className="mb-6 animate-fade-in-up relative" ref={searchContainerRef}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur opacity-50"></div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari berita terkini..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => {
                        // Delay clearing results to allow click on link
                        setTimeout(() => setIsSearchFocused(false), 200);
                      }}
                      className="pl-12 pr-5 py-4 w-full bg-white/90 backdrop-blur border border-primary/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-base"
                    />
                     {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  {/* Mobile Search Results Dropdown */}
                  {isSearchFocused && searchQuery && (
                    <div className="absolute top-full mt-3 w-full bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-20">
                      {isSearching ? (
                        <div className="p-4 flex items-center justify-center text-gray-500">
                          <Loader2 className="animate-spin h-5 w-5 mr-2" />
                          <span>Mencari...</span>
                        </div>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                          <a
                            key={index}
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-5 py-3 hover:bg-gray-100 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                            onClick={() => setIsMenuOpen(false)} // Close menu on click
                          >
                            <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">{result.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(result.publishedAt).toLocaleDateString()}
                            </p>
                          </a>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          {searchError || 'Tidak ada hasil.'}
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
                  onClick={handleNavLinkClick}
                  className="group flex items-center justify-between px-5 py-4 rounded-2xl text-gray-700 hover:bg-gradient-to-r hover:from-primary/10 hover:via-accent/10 hover:to-highlight/10 hover:text-primary transition-all duration-500 animate-fade-in-up hover:shadow-lg hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                      <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <span className="font-semibold text-base">{item.name}</span>
                      <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ChevronUp className="h-4 w-4 rotate-90 text-gray-400 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 group transition-all duration-700 ${
          showBackToTop ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-75'
        }`}
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          
          {/* Button */}
          <div className="relative p-4 bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
            <ChevronUp className="h-6 w-6 group-hover:animate-bounce" />
          </div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
          Kembali ke atas
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      </button>

      {/* This spacer div prevents the main content from being hidden behind the fixed navbar. 
          Its height dynamically adjusts with the navbar's height on scroll. */}
      <div className={`transition-all duration-700 ${isScrolled ? 'h-16' : 'h-20'}`}></div>
    </>
  );
};

export default Navbar;
