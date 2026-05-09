import React, { useState } from 'react';
import {
  Globe,
  User,
  Shuffle,
  Hash,
  Download,
  Trash2,
  Play,
  FileUp,
  AlertCircle,
  CheckCircle2,
  Settings,
  Copy,
  Terminal,
  ArrowLeft
} from 'lucide-react';

const WordlistForge = ({ onBack, initialTab = 'profile' }) => {
  // Active Tab State
  const [activeTab, setActiveTab] = useState(initialTab);

  // Profile Mode States
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    dob: '',
    pet: '',
    partner: '',
    city: '',
    company: '',
    keywords: ''
  });
  const [transformations, setTransformations] = useState({
    lowercase: false,
    uppercase: false,
    capitalize: false,
    reverse: false,
    leet: false,
    appendNumbers: false,
    stripVowels: false
  });
  const [customPattern, setCustomPattern] = useState('{firstname}_{year}');

  // Spider Mode States
  const [spiderUrl, setSpiderUrl] = useState('');
  const [crawlDepth, setCrawlDepth] = useState(2);
  const [followExternal, setFollowExternal] = useState(false);
  const [excludePaths, setExcludePaths] = useState('');
  const [minWordLength, setMinWordLength] = useState(3);
  const [maxWordLength, setMaxWordLength] = useState(20);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [convertLowercase, setConvertLowercase] = useState(true);
  const [extractEmails, setExtractEmails] = useState(false);
  const [spiderOutput, setSpiderOutput] = useState([]);
  const [isCrawling, setIsCrawling] = useState(false);

  // Mutation Mode States
  const [baseWordlist, setBaseWordlist] = useState('');
  const [mutationRules, setMutationRules] = useState({
    toggleCase: false,
    appendNumbers: false,
    prependNumbers: false,
    appendSpecial: false,
    prependSpecial: false,
    substitutions: false,
    addYears: false,
    doubleWord: false,
    reverseCombine: false,
    aiEnhance: false
  });

  // Mask Mode States
  const [charsets, setCharsets] = useState({
    charset1: 'abcdefghijklmnopqrstuvwxyz',
    charset2: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    charset3: '0123456789',
    charset4: '!@#$%^&*()'
  });
  const [maskPattern, setMaskPattern] = useState('?u?l?l?l?d?d');

  // Output Settings
  const [outputFormat, setOutputFormat] = useState('txt');
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [estimatedSize, setEstimatedSize] = useState('0 KB');
  const [wordCount, setWordCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  // Preview State
  const [previewWords, setPreviewWords] = useState(['john2026', 'J0hn!', 'jnh2026']);

  // Calculate keyspace for mask
  const calculateKeyspace = (pattern) => {
    let total = 1;
    for (let char of pattern) {
      if (char === '?') continue;
      switch (char) {
        case 'l': total *= 26; break;
        case 'u': total *= 26; break;
        case 'd': total *= 10; break;
        case 's': total *= 33; break;
        case 'a': total *= 95; break;
        case '1': total *= charsets.charset1.length; break;
        case '2': total *= charsets.charset2.length; break;
        case '3': total *= charsets.charset3.length; break;
        case '4': total *= charsets.charset4.length; break;
      }
    }
    return total.toLocaleString();
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'spider', label: 'Spider', icon: Globe },
    { id: 'mutation', label: 'Mutation', icon: Shuffle },
    { id: 'mask', label: 'Mask Attack', icon: Hash }
  ];

  const handleGenerate = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleSpiderCrawl = () => {
    setIsCrawling(true);
    // Simulate crawling
    setTimeout(() => {
      setSpiderOutput(['admin', 'login', 'dashboard', 'api', 'user', 'password']);
      setIsCrawling(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-emerald-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-2xl animate-slideIn">
          <CheckCircle2 size={20} />
          <span className="font-medium">Wordlist generated successfully! 150,234 unique words.</span>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <button 
                  onClick={onBack}
                  className="p-2 hover:bg-gray-800 rounded-xl text-slate-400 hover:text-white transition-colors"
                  title="Go Back"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Terminal size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Wordlist Forge
                  </h1>
                  <p className="text-xs text-gray-400">Advanced Wordlist Generator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 mt-6 bg-gray-800/50 p-1 rounded-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* PROFILE MODE */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Panel - Target Info */}
            <div className="lg:col-span-2 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <User size={18} className="text-cyan-400" />
                <h2 className="text-lg font-semibold">Target Information</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">First Name</label>
                    <input
                      type="text"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
                      placeholder="John"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
                      placeholder="Doe"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Nickname</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
                    placeholder="Johnny"
                    value={profileData.nickname}
                    onChange={(e) => setProfileData({ ...profileData, nickname: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
                    value={profileData.dob}
                    onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Pet's Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
                    placeholder="Max"
                    value={profileData.pet}
                    onChange={(e) => setProfileData({ ...profileData, pet: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Partner's Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
                    placeholder="Jane"
                    value={profileData.partner}
                    onChange={(e) => setProfileData({ ...profileData, partner: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Hometown / City</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
                    placeholder="New York"
                    value={profileData.city}
                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Company</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
                    placeholder="Acme Corp"
                    value={profileData.company}
                    onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Additional Keywords</label>
                  <textarea
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition resize-none"
                    rows="3"
                    placeholder="keyword1, keyword2, keyword3"
                    value={profileData.keywords}
                    onChange={(e) => setProfileData({ ...profileData, keywords: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Right Panel - Pattern Builder */}
            <div className="lg:col-span-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Settings size={18} className="text-cyan-400" />
                <h2 className="text-lg font-semibold">Pattern Builder</h2>
              </div>

              {/* Pattern Input */}
              <div className="mb-6">
                <label className="block text-xs text-gray-400 mb-2">Custom Pattern</label>
                <input
                  type="text"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-sm font-mono text-cyan-300 focus:border-cyan-500 focus:outline-none transition"
                  value={customPattern}
                  onChange={(e) => setCustomPattern(e.target.value)}
                />
              </div>

              {/* Pattern Chips */}
              <div className="mb-6">
                <label className="block text-xs text-gray-400 mb-2">Available Placeholders</label>
                <div className="flex flex-wrap gap-2">
                  {['{firstname}', '{lastname}', '{nickname}', '{pet}', '{partner}', '{city}', '{company}', '{year}'].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => setCustomPattern(prev => prev + chip)}
                      className="px-3 py-1.5 text-xs bg-gray-700/50 hover:bg-cyan-500/20 border border-gray-600 hover:border-cyan-500/50 rounded-lg text-gray-300 hover:text-cyan-300 transition cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transformations */}
              <div className="mb-6">
                <label className="block text-xs text-gray-400 mb-3">Transformations</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(transformations).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setTransformations({ ...transformations, [key]: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Live Preview */}
              <div>
                <label className="block text-xs text-gray-400 mb-2">Live Preview</label>
                <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-4 font-mono text-sm">
                  <div className="flex flex-wrap gap-2">
                    {previewWords.map((word, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-800 rounded text-cyan-300 text-xs">
                        {word}
                      </span>
                    ))}
                    <span className="text-gray-600">...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SPIDER MODE */}
        {activeTab === 'spider' && (
          <div className="space-y-6">
            {/* Top Bar - URL Input */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-gray-400 mb-2">Target URL</label>
                  <input
                    type="url"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
                    placeholder="https://example.com"
                    value={spiderUrl}
                    onChange={(e) => setSpiderUrl(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSpiderCrawl}
                  disabled={isCrawling}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-medium flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25"
                >
                  {isCrawling ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Crawling...
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      Start Crawl
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Configuration Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Crawl Settings */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                  <Globe size={16} className="text-cyan-400" />
                  Crawl Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">
                      Crawl Depth: <span className="text-cyan-400">{crawlDepth}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={crawlDepth}
                      onChange={(e) => setCrawlDepth(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>5</span>
                      <span>10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Follow External Links</span>
                    <button
                      onClick={() => setFollowExternal(!followExternal)}
                      className={`w-12 h-6 rounded-full transition relative ${followExternal ? 'bg-cyan-500' : 'bg-gray-600'
                        }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${followExternal ? 'left-6' : 'left-0.5'
                        }`} />
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Exclude Paths</label>
                    <textarea
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition resize-none"
                      rows="3"
                      placeholder="/admin&#10;/api&#10;/test"
                      value={excludePaths}
                      onChange={(e) => setExcludePaths(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Word Extraction Filters */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                  <Settings size={16} className="text-cyan-400" />
                  Extraction Filters
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Min Word Length</label>
                      <input
                        type="number"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
                        value={minWordLength}
                        onChange={(e) => setMinWordLength(parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Max Word Length</label>
                      <input
                        type="number"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
                        value={maxWordLength}
                        onChange={(e) => setMaxWordLength(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={includeNumbers}
                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white transition">Include Words with Numbers</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={convertLowercase}
                      onChange={(e) => setConvertLowercase(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white transition">Convert to Lowercase</span>
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Extract Emails also</span>
                    <button
                      onClick={() => setExtractEmails(!extractEmails)}
                      className={`w-12 h-6 rounded-full transition relative ${extractEmails ? 'bg-cyan-500' : 'bg-gray-600'
                        }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${extractEmails ? 'left-6' : 'left-0.5'
                        }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Output Console */}
            {spiderOutput.length > 0 && (
              <div className="bg-gray-900/90 border border-gray-700 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal size={16} className="text-green-400" />
                  <h3 className="text-base font-semibold text-green-400">Live Output</h3>
                  <span className="text-xs text-gray-500 ml-auto">{spiderOutput.length} words found</span>
                </div>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm max-h-48 overflow-y-auto">
                  <div className="flex flex-wrap gap-2">
                    {spiderOutput.map((word, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-800/50 rounded text-green-400 text-xs">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MUTATION MODE */}
        {activeTab === 'mutation' && (
          <div className="space-y-6">
            {/* Base Wordlist Input */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <FileUp size={16} className="text-cyan-400" />
                Base Wordlist
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-gray-600 hover:border-cyan-500/50 rounded-xl p-8 text-center cursor-pointer transition group">
                  <FileUp size={32} className="mx-auto mb-3 text-gray-500 group-hover:text-cyan-400 transition" />
                  <p className="text-sm text-gray-400">Drag & drop your .txt file here</p>
                  <p className="text-xs text-gray-500 mt-1">or click to browse</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2">Or Paste Wordlist</label>
                  <textarea
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition resize-none h-full"
                    rows="4"
                    placeholder="password&#10;admin&#10;welcome&#10;123456"
                    value={baseWordlist}
                    onChange={(e) => setBaseWordlist(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Mutation Rules */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Shuffle size={16} className="text-cyan-400" />
                Select Mutation Rules
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(mutationRules).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer group bg-gray-700/30 hover:bg-gray-700/50 rounded-lg p-3 transition border border-gray-700 hover:border-cyan-500/30">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setMutationRules({ ...mutationRules, [key]: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500"
                    />
                    <div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      {key === 'aiEnhance' && (
                        <span className="text-xs text-purple-400 block">Advanced</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MASK ATTACK MODE */}
        {activeTab === 'mask' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Charsets Definition */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Hash size={16} className="text-cyan-400" />
                Custom Charsets
              </h3>
              <div className="space-y-4">
                {Object.entries(charsets).map(([key, value], idx) => (
                  <div key={key}>
                    <label className="block text-xs text-gray-400 mb-1">
                      Charset {idx + 1} <code className="text-cyan-400">?{idx + 1}</code>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm font-mono text-white focus:border-cyan-500 focus:outline-none transition"
                      value={value}
                      onChange={(e) => setCharsets({ ...charsets, [key]: e.target.value })}
                    />
                  </div>
                ))}
              </div>

              {/* Built-in Shortcuts */}
              <div className="mt-6">
                <label className="block text-xs text-gray-400 mb-2">Built-in Shortcuts</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { code: '?l', label: 'Lowercase (a-z)' },
                    { code: '?u', label: 'Uppercase (A-Z)' },
                    { code: '?d', label: 'Digits (0-9)' },
                    { code: '?s', label: 'Special Chars' },
                    { code: '?a', label: 'All Chars' }
                  ].map((shortcut) => (
                    <button
                      key={shortcut.code}
                      onClick={() => setMaskPattern(prev => prev + shortcut.code)}
                      className="px-3 py-1.5 text-xs bg-gray-700/50 hover:bg-cyan-500/20 border border-gray-600 hover:border-cyan-500/50 rounded-lg text-gray-300 hover:text-cyan-300 transition cursor-pointer font-mono"
                    >
                      {shortcut.code} <span className="text-gray-500">({shortcut.label})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mask Pattern & Preview */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Settings size={16} className="text-cyan-400" />
                Mask Pattern
              </h3>

              {/* Mask Input */}
              <div className="mb-6">
                <label className="block text-xs text-gray-400 mb-2">Pattern</label>
                <input
                  type="text"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-lg font-mono text-cyan-300 focus:border-cyan-500 focus:outline-none transition"
                  value={maskPattern}
                  onChange={(e) => setMaskPattern(e.target.value)}
                />
              </div>

              {/* Keyspace Calculator */}
              <div className="mb-6 bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total Combinations:</span>
                  <span className="text-lg font-bold text-cyan-400 font-mono">
                    {calculateKeyspace(maskPattern)}
                  </span>
                </div>
              </div>

              {/* Quick Presets */}
              <div>
                <label className="block text-xs text-gray-400 mb-2">Quick Presets</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { pattern: '?d?d?d?d?d?d', label: '6-Digit PIN' },
                    { pattern: '?l?l?l?l?l?l?l?l', label: '8-Char Lower' },
                    { pattern: '?u?l?l?l?l?l?d?d', label: 'Complex 8' }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setMaskPattern(preset.pattern)}
                      className="px-3 py-2 text-xs bg-gray-700/50 hover:bg-cyan-500/20 border border-gray-600 hover:border-cyan-500/50 rounded-lg text-gray-300 hover:text-cyan-300 transition cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Footer - Output & Actions */}
      <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 mt-8 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left Side - Stats */}
            <div className="flex items-center gap-6">
              <div className="text-sm">
                <span className="text-gray-400">Wordlist Size: </span>
                <span className="text-cyan-400 font-semibold">{estimatedSize}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Words: </span>
                <span className="text-cyan-400 font-semibold">{wordCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={removeDuplicates}
                    onChange={(e) => setRemoveDuplicates(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className="text-xs text-gray-400 group-hover:text-white transition">Remove Duplicates</span>
                </label>
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-3">
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none cursor-pointer"
              >
                <option value="txt">.txt Format</option>
                <option value="hashcat">Hashcat Format</option>
                <option value="john">John the Ripper</option>
              </select>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg flex items-center gap-2 text-sm transition">
                <Copy size={14} />
                Copy
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg flex items-center gap-2 text-sm transition">
                <Trash2 size={14} />
                Clear
              </button>
              <button
                onClick={handleGenerate}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg flex items-center gap-2 font-medium text-sm transition shadow-lg shadow-cyan-500/25"
              >
                <Download size={16} />
                Generate & Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WordlistForge;