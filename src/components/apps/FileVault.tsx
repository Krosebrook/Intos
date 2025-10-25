import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Progress } from '../ui/progress';
import {
  FolderOpen,
  File,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Archive,
  Download,
  Upload,
  Search,
  Filter,
  Grid3x3,
  List,
  Star,
  Share2,
  Trash2,
  MoreVertical,
  Clock,
  HardDrive,
  Cloud,
  Zap,
  Lock,
  Eye,
  Link2,
  Copy,
  Edit,
  Plus,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Alert, AlertDescription } from '../ui/alert';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  mimeType?: string;
  size?: number;
  modified: Date;
  owner: string;
  source: 'drive' | 'dropbox';
  path: string;
  starred?: boolean;
  shared?: boolean;
  thumbnail?: string;
  linkedEntity?: {
    type: 'deal' | 'ticket' | 'contact';
    id: string;
    name: string;
  };
}

const mockFiles: FileItem[] = [
  {
    id: 'file-1',
    name: 'Q4 Sales Proposal.pdf',
    type: 'file',
    mimeType: 'application/pdf',
    size: 2456789,
    modified: new Date(2025, 9, 24, 14, 30),
    owner: 'sarah@intinc.com',
    source: 'drive',
    path: '/Sales/Proposals',
    starred: true,
    linkedEntity: { type: 'deal', id: 'deal-123', name: 'Acme Corp Deal' }
  },
  {
    id: 'file-2',
    name: 'Customer Support Guide.docx',
    type: 'file',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 1234567,
    modified: new Date(2025, 9, 23, 10, 15),
    owner: 'john@intinc.com',
    source: 'dropbox',
    path: '/Support/Documentation',
    shared: true,
    linkedEntity: { type: 'ticket', id: 'ticket-456', name: 'Support Ticket #456' }
  },
  {
    id: 'file-3',
    name: 'Product Screenshots',
    type: 'folder',
    modified: new Date(2025, 9, 22, 16, 0),
    owner: 'marketing@intinc.com',
    source: 'drive',
    path: '/Marketing/Assets'
  },
  {
    id: 'file-4',
    name: 'customer-demo-video.mp4',
    type: 'file',
    mimeType: 'video/mp4',
    size: 45678900,
    modified: new Date(2025, 9, 20, 9, 45),
    owner: 'sales@intinc.com',
    source: 'drive',
    path: '/Sales/Demos',
    starred: true
  },
  {
    id: 'file-5',
    name: 'Brand Assets',
    type: 'folder',
    modified: new Date(2025, 9, 15, 11, 20),
    owner: 'design@intinc.com',
    source: 'dropbox',
    path: '/Design'
  },
  {
    id: 'file-6',
    name: 'contract-template.pdf',
    type: 'file',
    mimeType: 'application/pdf',
    size: 567890,
    modified: new Date(2025, 9, 10, 13, 30),
    owner: 'legal@intinc.com',
    source: 'drive',
    path: '/Legal/Templates',
    shared: true
  }
];

const mockStorage = {
  drive: {
    used: 15.4,
    total: 100,
    fileCount: 1247
  },
  dropbox: {
    used: 8.7,
    total: 50,
    fileCount: 832
  }
};

const mockRecentActivity = [
  { action: 'uploaded', file: 'Q4 Sales Proposal.pdf', user: 'sarah@intinc.com', time: '5 min ago' },
  { action: 'shared', file: 'Customer Support Guide.docx', user: 'john@intinc.com', time: '2 hours ago' },
  { action: 'deleted', file: 'old-draft.txt', user: 'you', time: '1 day ago' }
];

export function FileVault() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState<'all' | 'drive' | 'dropbox'>('all');
  const [filterType, setFilterType] = useState<'all' | 'files' | 'folders'>('all');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') return FolderOpen;
    
    if (!file.mimeType) return File;
    
    if (file.mimeType.startsWith('image/')) return ImageIcon;
    if (file.mimeType.startsWith('video/')) return Video;
    if (file.mimeType.startsWith('audio/')) return Music;
    if (file.mimeType.includes('pdf')) return FileText;
    if (file.mimeType.includes('zip') || file.mimeType.includes('rar')) return Archive;
    
    return File;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '-';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  const filteredFiles = mockFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.path.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = filterSource === 'all' || file.source === filterSource;
    const matchesType = filterType === 'all' || 
                       (filterType === 'files' && file.type === 'file') ||
                       (filterType === 'folders' && file.type === 'folder');
    return matchesSearch && matchesSource && matchesType;
  });

  return (
    <div className="h-full flex flex-col p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">FileVault</h1>
          <p className="text-gray-400">Unified file management for Drive & Dropbox</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-white/20 text-white">
            <Link2 className="w-4 h-4 mr-2" />
            Connect Storage
          </Button>
          <Button size="sm" className="bg-[#E27305] hover:bg-[#F08515] text-white" onClick={() => setShowUpload(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
        </div>
      </div>

      {/* AI Assistant */}
      <Alert className="border-[#529ADB] bg-[#529ADB]/10">
        <Sparkles className="w-4 h-4 text-[#529ADB]" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-sm text-gray-300">
            <strong className="text-white">Smart Organization:</strong> AI detected 12 files that should be associated with active deals
          </span>
          <Button size="sm" variant="outline" className="border-[#529ADB] text-[#529ADB] hover:bg-[#529ADB]/10">
            Review & Link
          </Button>
        </AlertDescription>
      </Alert>

      {/* Storage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-gray-400">Google Drive</p>
                <p className="text-2xl text-white">{mockStorage.drive.used} GB</p>
              </div>
              <Cloud className="w-8 h-8 text-[#529ADB]" />
            </div>
            <Progress value={(mockStorage.drive.used / mockStorage.drive.total) * 100} className="h-2" />
            <p className="text-xs text-gray-400 mt-1">
              {mockStorage.drive.used} / {mockStorage.drive.total} GB used
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-gray-400">Dropbox</p>
                <p className="text-2xl text-white">{mockStorage.dropbox.used} GB</p>
              </div>
              <HardDrive className="w-8 h-8 text-[#46A57B]" />
            </div>
            <Progress value={(mockStorage.dropbox.used / mockStorage.dropbox.total) * 100} className="h-2" />
            <p className="text-xs text-gray-400 mt-1">
              {mockStorage.dropbox.used} / {mockStorage.dropbox.total} GB used
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Files</p>
                <p className="text-2xl text-white">
                  {(mockStorage.drive.fileCount + mockStorage.dropbox.fileCount).toLocaleString()}
                </p>
              </div>
              <File className="w-8 h-8 text-[#E27305]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">CRM Linked</p>
                <p className="text-2xl text-white">24</p>
              </div>
              <Zap className="w-8 h-8 text-[#46A57B]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Sidebar */}
        <Card className="bg-white/5 border-white/10 lg:col-span-1">
          <CardHeader>
            <h3 className="text-white">Quick Access</h3>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { icon: Star, label: 'Starred', count: 8, color: '#E27305' },
              { icon: Share2, label: 'Shared with me', count: 15, color: '#529ADB' },
              { icon: Clock, label: 'Recent', count: 23, color: '#46A57B' },
              { icon: Trash2, label: 'Trash', count: 5, color: '#CBD5E0' }
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-2 rounded hover:bg-white/5 cursor-pointer">
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  <span className="text-sm text-white">{item.label}</span>
                </div>
                <Badge variant="outline" className="text-xs bg-white/5 border-white/20">
                  {item.count}
                </Badge>
              </div>
            ))}

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm text-gray-400 mb-2">Storage Sources</h4>
              <div className="space-y-2">
                {[
                  { source: 'drive', label: 'Google Drive', files: mockStorage.drive.fileCount },
                  { source: 'dropbox', label: 'Dropbox', files: mockStorage.dropbox.fileCount }
                ].map((item) => (
                  <div key={item.source} className="flex items-center justify-between p-2 rounded hover:bg-white/5 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-[#529ADB]" />
                      <span className="text-sm text-white">{item.label}</span>
                    </div>
                    <Badge variant="outline" className="text-xs bg-white/5 border-white/20">
                      {item.files.toLocaleString()}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm text-gray-400 mb-2">Recent Activity</h4>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {mockRecentActivity.map((activity, idx) => (
                    <div key={idx} className="p-2 rounded bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        {activity.action === 'uploaded' && <Upload className="w-3 h-3 text-[#46A57B]" />}
                        {activity.action === 'shared' && <Share2 className="w-3 h-3 text-[#529ADB]" />}
                        {activity.action === 'deleted' && <Trash2 className="w-3 h-3 text-red-400" />}
                        <span className="text-xs text-white capitalize">{activity.action}</span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{activity.file}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        {/* File Browser */}
        <Card className="bg-white/5 border-white/10 lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-[#E27305]" />
                <span className="text-gray-400">/</span>
                <span className="text-white">All Files</span>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search files..."
                    className="pl-10 w-64 bg-white/5 border-white/10 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterSource} onValueChange={(v: any) => setFilterSource(v)}>
                  <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="drive">Google Drive</SelectItem>
                    <SelectItem value="dropbox">Dropbox</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-1 border border-white/10 rounded p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <ScrollArea className="h-[600px]">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredFiles.map((file) => {
                    const Icon = getFileIcon(file);
                    return (
                      <div
                        key={file.id}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 cursor-pointer transition-all group"
                        onClick={() => setSelectedFile(file)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            file.type === 'folder' ? 'bg-[#E27305]/20' : 'bg-[#529ADB]/20'
                          }`}>
                            <Icon className="w-6 h-6" style={{ 
                              color: file.type === 'folder' ? '#E27305' : '#529ADB' 
                            }} />
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Star className="w-4 h-4 mr-2" />
                                {file.starred ? 'Unstar' : 'Star'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <h4 className="text-sm text-white mb-1 truncate">{file.name}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="text-xs" style={{
                            backgroundColor: file.source === 'drive' ? '#529ADB20' : '#46A57B20',
                            color: file.source === 'drive' ? '#529ADB' : '#46A57B'
                          }}>
                            {file.source}
                          </Badge>
                          {file.starred && <Star className="w-3 h-3 text-[#E27305] fill-[#E27305]" />}
                          {file.shared && <Share2 className="w-3 h-3 text-[#529ADB]" />}
                        </div>
                        
                        <p className="text-xs text-gray-400">
                          {file.type === 'file' ? formatFileSize(file.size) : '-'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {file.modified.toLocaleDateString()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-4 p-3 text-xs text-gray-400 border-b border-white/10">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-2">Source</div>
                    <div className="col-span-2">Modified</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-1">Actions</div>
                  </div>
                  {filteredFiles.map((file) => {
                    const Icon = getFileIcon(file);
                    return (
                      <div
                        key={file.id}
                        className="grid grid-cols-12 gap-4 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 cursor-pointer transition-all group"
                        onClick={() => setSelectedFile(file)}
                      >
                        <div className="col-span-5 flex items-center gap-3">
                          <Icon className="w-5 h-5" style={{ 
                            color: file.type === 'folder' ? '#E27305' : '#529ADB' 
                          }} />
                          <span className="text-white truncate">{file.name}</span>
                          {file.starred && <Star className="w-3 h-3 text-[#E27305] fill-[#E27305]" />}
                        </div>
                        <div className="col-span-2 flex items-center">
                          <Badge className="text-xs" style={{
                            backgroundColor: file.source === 'drive' ? '#529ADB20' : '#46A57B20',
                            color: file.source === 'drive' ? '#529ADB' : '#46A57B'
                          }}>
                            {file.source}
                          </Badge>
                        </div>
                        <div className="col-span-2 flex items-center text-sm text-gray-400">
                          {file.modified.toLocaleDateString()}
                        </div>
                        <div className="col-span-2 flex items-center text-sm text-gray-400">
                          {file.type === 'file' ? formatFileSize(file.size) : '-'}
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* File Details Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedFile(null)}>
          <Card className="bg-[#172235] border-white/10 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = getFileIcon(selectedFile);
                    return <Icon className="w-6 h-6 text-[#529ADB]" />;
                  })()}
                  <div>
                    <h3 className="text-white">{selectedFile.name}</h3>
                    <p className="text-sm text-gray-400">{selectedFile.path}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>×</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Source</p>
                  <Badge style={{
                    backgroundColor: selectedFile.source === 'drive' ? '#529ADB20' : '#46A57B20',
                    color: selectedFile.source === 'drive' ? '#529ADB' : '#46A57B'
                  }}>
                    {selectedFile.source === 'drive' ? 'Google Drive' : 'Dropbox'}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Size</p>
                  <p className="text-white">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Modified</p>
                  <p className="text-white">{selectedFile.modified.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Owner</p>
                  <p className="text-white">{selectedFile.owner}</p>
                </div>
              </div>

              {selectedFile.linkedEntity && (
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm text-gray-400 mb-1">Linked to CRM</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">{selectedFile.linkedEntity.name}</p>
                      <p className="text-xs text-gray-400">{selectedFile.linkedEntity.type}</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-white/20">
                      View in CRM
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-[#529ADB] hover:bg-[#6AABEB] text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="border-white/20">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="border-white/20">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowUpload(false)}>
          <Card className="bg-[#172235] border-white/10 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-white">Upload Files</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowUpload(false)}>×</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-white mb-2">Drag & drop files here</p>
                <p className="text-sm text-gray-400 mb-4">or click to browse</p>
                <Button className="bg-[#529ADB] hover:bg-[#6AABEB] text-white">
                  Select Files
                </Button>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Upload to</label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drive">Google Drive</SelectItem>
                    <SelectItem value="dropbox">Dropbox</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Folder Path</label>
                <Input placeholder="/My Files" className="bg-white/5 border-white/10 text-white" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
