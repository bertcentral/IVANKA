<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CyberNinja 71+ & CodeForce++ IDE</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <style>
        :root {
            --primary-dark: #0d1117;
            --secondary-dark: #161b22;
            --accent-color: #58a6ff;
            --text-primary: #f0f6fc;
            --text-secondary: #8b949e;
            --border-color: #30363d;
            --success-color: #3fb950;
            --danger-color: #f85149;
            --warning-color: #d29922;
        }
        
        body {
            background: var(--primary-dark);
            color: var(--text-primary);
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            height: 100vh;
            overflow: hidden;
        }
        
        .logo {
            font-weight: 700;
            background: linear-gradient(90deg, #58a6ff, #3fb950);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        
        .navbar {
            background: var(--secondary-dark);
            border-bottom: 1px solid var(--border-color);
        }
        
        .sidebar {
            background: var(--secondary-dark);
            border-right: 1px solid var(--border-color);
            height: calc(100vh - 56px);
        }
        
        .sidebar-item {
            padding: 10px 15px;
            cursor: pointer;
            border-left: 3px solid transparent;
            transition: all 0.2s;
        }
        
        .sidebar-item:hover {
            background: rgba(255,255,255,0.05);
            border-left-color: var(--accent-color);
        }
        
        .sidebar-item.active {
            background: rgba(88, 166, 255, 0.1);
            border-left-color: var(--accent-color);
        }
        
        .main-content {
            height: calc(100vh - 56px);
            overflow: hidden;
        }
        
        #editor-container {
            height: 100%;
            overflow: hidden;
            position: relative;
        }
        
        #editor {
            width: 100%;
            height: 60%;
            border: 1px solid var(--border-color);
            background: var(--primary-dark);
        }
        
        .panel-container {
            height: 40%;
            background: var(--secondary-dark);
            border-top: 1px solid var(--border-color);
            position: relative;
        }
        
        .panel-header {
            background: var(--secondary-dark);
            border-bottom: 1px solid var(--border-color);
            padding: 5px 10px;
            display: flex;
            justify-content: space-between;
        }
        
        .panel-tabs {
            display: flex;
        }
        
        .panel-tab {
            padding: 5px 10px;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            margin-right: 5px;
        }
        
        .panel-tab.active {
            border-bottom-color: var(--accent-color);
            color: var(--accent-color);
        }
        
        .panel-content {
            height: calc(100% - 36px);
            overflow: hidden;
        }
        
        #terminal {
            height: 100%;
            background: var(--primary-dark);
        }
        
        #output {
            height: 100%;
            background: var(--primary-dark);
            padding: 10px;
            font-family: monospace;
            white-space: pre;
            overflow-y: auto;
            display: none;
        }
        
        #visualization {
            height: 100%;
            background: var(--primary-dark);
            padding: 10px;
            display: none;
        }
        
        .btn-primary {
            background: var(--accent-color);
            border-color: var(--accent-color);
        }
        
        .btn-primary:hover {
            background: #4589d1;
            border-color: #4589d1;
        }
        
        .btn-success {
            background: var(--success-color);
            border-color: var(--success-color);
        }
        
        .status-bar {
            background: var(--secondary-dark);
            border-top: 1px solid var(--border-color);
            height: 25px;
            font-size: 12px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            color: var(--text-secondary);
        }
        
        .dropdown-menu {
            background: var(--secondary-dark);
            border: 1px solid var(--border-color);
        }
        
        .dropdown-item {
            color: var(--text-primary);
        }
        
        .dropdown-item:hover {
            background: rgba(255,255,255,0.05);
            color: var(--text-primary);
        }
        
        #canvas {
            width: 100%;
            height: 100%;
        }
        
        .resizer {
            width: 100%;
            height: 5px;
            background: var(--secondary-dark);
            cursor: row-resize;
            position: absolute;
            top: 0;
            transform: translateY(-50%);
            z-index: 10;
        }
        
        /* File explorer styles */
        .file-explorer {
            padding: 10px 0;
        }
        
        .file-item {
            padding: 4px 15px 4px 20px;
            cursor: pointer;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .file-item:hover {
            background: rgba(255,255,255,0.05);
        }
        
        .file-item.active {
            background: rgba(88, 166, 255, 0.1);
            color: var(--accent-color);
        }
        
        .folder-label {
            padding: 4px 15px;
            font-weight: 600;
            color: var(--text-secondary);
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .folder-label i {
            cursor: pointer;
        }
    </style>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
            <a class="navbar-brand logo" href="#">CyberNinja 71+ & CodeForce++</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            File
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" id="newFile"><i class="bi bi-file-earmark-plus"></i> New File</a></li>
                            <li><a class="dropdown-item" href="#" id="openFile"><i class="bi bi-folder2-open"></i> Open File</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" id="saveFile"><i class="bi bi-save"></i> Save</a></li>
                            <li><a class="dropdown-item" href="#" id="saveFileAs"><i class="bi bi-save-fill"></i> Save As</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            Edit
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" id="undo"><i class="bi bi-arrow-counterclockwise"></i> Undo</a></li>
                            <li><a class="dropdown-item" href="#" id="redo"><i class="bi bi-arrow-clockwise"></i> Redo</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" id="cut"><i class="bi bi-scissors"></i> Cut</a></li>
                            <li><a class="dropdown-item" href="#" id="copy"><i class="bi bi-clipboard"></i> Copy</a></li>
                            <li><a class="dropdown-item" href="#" id="paste"><i class="bi bi-clipboard-plus"></i> Paste</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            View
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" id="toggleSidebar"><i class="bi bi-layout-sidebar"></i> Toggle Sidebar</a></li>
                            <li><a class="dropdown-item" href="#" id="toggleTerminal"><i class="bi bi-terminal"></i> Toggle Terminal</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" id="zoomIn"><i class="bi bi-zoom-in"></i> Zoom In</a></li>
                            <li><a class="dropdown-item" href="#" id="zoomOut"><i class="bi bi-zoom-out"></i> Zoom Out</a></li>
                        </ul>
                    </li>
                </ul>
                <div class="d-flex">
                    <button id="runCode" class="btn btn-primary me-2">
                        <i class="bi bi-play-fill"></i> Run C#
                    </button>
                    <button id="vectorize" class="btn btn-success">
                        <i class="bi bi-diagram-3"></i> Vectorize
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Layout -->
    <div class="container-fluid p-0">
        <div class="row g-0">
            <!-- Sidebar -->
            <div class="col-md-2 sidebar">
                <div class="sidebar-item active" id="explorer-tab">
                    <i class="bi bi-folder2"></i> Explorer
                </div>
                <div class="sidebar-item" id="search-tab">
                    <i class="bi bi-search"></i> Search
                </div>
                <div class="sidebar-item" id="git-tab">
                    <i class="bi bi-git"></i> Source Control
                </div>
                <div class="sidebar-item" id="debug-tab">
                    <i class="bi bi-bug"></i> Debug
                </div>
                <div class="sidebar-item" id="extensions-tab">
                    <i class="bi bi-puzzle"></i> Extensions
                </div>
                
                <!-- File Explorer Content -->
                <div class="file-explorer">
                    <div class="folder-label">
                        <span>PROJECT</span>
                        <i class="bi bi-plus-circle" id="addNewFile"></i>
                    </div>
                    <div class="file-item active">Program.cs</div>
                    <div class="file-item">CyberNinja.cs</div>
                    <div class="file-item">CodeForce.cs</div>
                    <div class="file-item">README.md</div>
                </div>
            </div>
            
            <!-- Main Content -->
            <div class="col-md-10 main-content">
                <div id="editor-container">
                    <!-- Editor -->
                    <div id="editor"></div>
                    
                    <!-- Bottom Panel -->
                    <div class="panel-container">
                        <!-- Resizer handle -->
                        <div class="resizer" id="panelResizer"></div>
                        
                        <div class="panel-header">
                            <div class="panel-tabs">
                                <div class="panel-tab active" data-target="terminal">Terminal</div>
                                <div class="panel-tab" data-target="output">Output</div>
                                <div class="panel-tab" data-target="visualization">Visualization</div>
                            </div>
                            <div class="panel-actions">
                                <i class="bi bi-x" id="closePanel"></i>
                            </div>
                        </div>
                        <div class="panel-content">
                            <div id="terminal"></div>
                            <div id="output"></div>
                            <div id="visualization">
                                <canvas id="canvas"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Status Bar -->
                    <div class="status-bar">
                        <div class="me-auto">Ready</div>
                        <div>Ln 1, Col 1</div>
                        <div class="ms-3">UTF-8</div>
                        <div class="ms-3">C#</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js"></script>
    <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.8.0/lib/xterm-addon-fit.min.js"></script>
    <script>
        // Monaco Editor
        require.config({
            paths: {
                'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs'
            }
        });
        
        require(['vs/editor/editor.main'], () => {
            // Create editor
            const editor = monaco.editor.create(document.getElementById('editor'), {
                value: `using System;
using System.Linq;
using System.Collections.Generic;

namespace CyberNinja
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("CyberNinja 71+ Activated!");
            Console.WriteLine("CodeForce++ Engine Running...");
            
            // Initialize sample data
            var data = new[] { 10, 20, 30, 40, 50 };
            
            // Process data
            var result = data.Select(x => x * 2).ToList();
            
            Console.WriteLine("Data processed successfully:");
            foreach (var item in result)
            {
                Console.WriteLine($"  → {item}");
            }
        }
    }
}`,
                language: 'csharp',
                theme: 'vs-dark',
                automaticLayout: true,
                minimap: {
                    enabled: true
                },
                scrollBeyondLastLine: false,
                renderLineHighlight: 'all',
                fontFamily: 'Consolas, "Courier New", monospace',
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: true,
                scrollbar: {
                    useShadows: false,
                    vertical: 'visible',
                    horizontal: 'visible',
                    verticalHasArrows: false,
                    horizontalHasArrows: false
                }
            });
            
            // Handle running code
            document.getElementById('runCode').addEventListener('click', () => {
                // Show output panel
                showPanel('output');
                
                // Display "running" message
                document.getElementById('output').innerText = "Running code...\n";
                
                // Simulate API call
                setTimeout(() => {
                    fetch('/api/runCSharp', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            code: editor.getValue()
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        // For demo, simulate successful output
                        if (!data.output) {
                            document.getElementById('output').innerText = 
                                "CyberNinja 71+ Activated!\n" +
                                "CodeForce++ Engine Running...\n" +
                                "Data processed successfully:\n" +
                                "  → 20\n" +
                                "  → 40\n" +
                                "  → 60\n" +
                                "  → 80\n" +
                                "  → 100\n";
                        } else {
                            document.getElementById('output').innerText = data.output || data.error;
                        }
                    })
                    .catch(err => {
                        document.getElementById('output').innerText = `Error: ${err}`;
                    });
                }, 500);
            });
            
            // Handle vectorizing
            document.getElementById('vectorize').addEventListener('click', () => {
                // Show visualization panel
                showPanel('visualization');
                
                // Simulate API call
                fetch('/api/vectorize', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text: editor.getValue()
                    })
                })
                .then(res => res.json())
                .then(data => {
                    // For demo, generate sample vector data
                    const vector = data.vector || [0.23, -0.45, 0.12, 0.67, -0.34, 0.18, -0.59, 0.78, 0.02, -0.13];
                    visualizeVector(vector);
                });
            });
            
            // Update cursor position in status bar
            editor.onDidChangeCursorPosition(e => {
                document.querySelector('.status-bar div:nth-child(2)').innerText = 
                    `Ln ${e.position.lineNumber}, Col ${e.position.column}`;
            });
        });
        
        // XTerm.js Terminal
        const term = new Terminal({
            cursorBlink: true,
            fontSize: 14,
            fontFamily: 'Consolas, monospace',
            theme: {
                background: '#0d1117',
                foreground: '#f0f6fc',
                cursor: '#58a6ff'
            },
            allowTransparency: true
        });
        
        const fitAddon = new FitAddon.FitAddon();
        term.loadAddon(fitAddon);
        
        // Initialize terminal
        term.open(document.getElementById('terminal'));
        fitAddon.fit();
        
        // Simulate connection
        term.write('\x1b[1;32m$ \x1b[0mWelcome to CyberNinja Terminal\r\n');
        term.write('\x1b[1;32m$ \x1b[0m');
        
        // Handle terminal input
        let commandBuffer = '';
        term.onData(data => {
            const code = data.charCodeAt(0);
            if (code === 13) { // Enter key
                term.write('\r\n');
                if (commandBuffer.trim().length > 0) {
                    processCommand(commandBuffer);
                }
                commandBuffer = '';
                term.write('\x1b[1;32m$ \x1b[0m');
            } else if (code === 127) { // Backspace
                if (commandBuffer.length > 0) {
                    commandBuffer = commandBuffer.substring(0, commandBuffer.length - 1);
                    term.write('\b \b');
                }
            } else {
                commandBuffer += data;
                term.write(data);
            }
        });
        
        // Simulate command processing
        function processCommand(command) {
            switch(command.trim()) {
                case 'help':
                    term.write('Available commands:\r\n');
                    term.write('  help     - Display this help\r\n');
                    term.write('  clear    - Clear terminal\r\n');
                    term.write('  version  - Show version info\r\n');
                    term.write('  run      - Run current code\r\n');
                    term.write('  ls       - List files\r\n');
                    break;
                case 'clear':
                    term.clear();
                    break;
                case 'version':
                    term.write('CyberNinja 71+ & CodeForce++ v1.0.0-alpha\r\n');
                    term.write('Build: 20240308-1\r\n');
                    break;
                case 'run':
                    term.write('Running C# code...\r\n');
                    setTimeout(() => {
                        term.write('CyberNinja 71+ Activated!\r\n');
                        term.write('CodeForce++ Engine Running...\r\n');
                        term.write('Data processed successfully:\r\n');
                        term.write('  → 20\r\n');
                        term.write('  → 40\r\n');
                        term.write('  → 60\r\n');
                        term.write('  → 80\r\n');
                        term.write('  → 100\r\n');
                        term.write('Process completed with exit code 0\r\n');
                    }, 500);
                    break;
                case 'ls':
                    term.write('Program.cs\r\n');
                    term.write('CyberNinja.cs\r\n');
                    term.write('CodeForce.cs\r\n');
                    term.write('README.md\r\n');
                    break;
                default:
                    term.write(`Command not found: ${command}\r\n`);
                    break;
            }
        }
        
        // Panel tab functionality
        document.querySelectorAll('.panel-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-target');
                showPanel(target);
            });
        });
        
        function showPanel(panelId) {
            // Update active tab
            document.querySelectorAll('.panel-tab').forEach(tab => {
                if (tab.getAttribute('data-target') === panelId) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
            
            // Show selected panel content
            document.querySelectorAll('#terminal, #output, #visualization').forEach(panel => {
                panel.style.display = 'none';
            });
            
            document.getElementById(panelId).style.display = 'block';
            
            // Fit terminal if showing it
            if (panelId === 'terminal') {
                fitAddon.fit();
            }
            
            // Redraw visualization if showing it
            if (panelId === 'visualization') {
                const vector = [0.23, -0.45, 0.12, 0.67, -0.34, 0.18, -0.59, 0.78, 0.02, -0.13];
                visualizeVector(vector);
            }
        }
        
        // Vector visualization using canvas
        function visualizeVector(vector) {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions to match its displayed size
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Background
            ctx.fillStyle = '#0d1117';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw title
            ctx.fillStyle = '#f0f6fc';
            ctx.font = '16px "Segoe UI", sans-serif';
            ctx.fillText('Vector Visualization (CyberNinja 71+)', 20, 30);
            
            // Draw vector components
            const barHeight = 30;
            const spacing = 10;
            const maxWidth = canvas.width - 100;
            
            // Find max absolute value to normalize
            const maxValue = Math.max(...vector.map(Math.abs));
            
            // Draw each vector component as a horizontal bar
            ctx.font = '12px "Segoe UI", sans-serif';
            for (let i = 0; i < vector.length; i++) {
                const y = 60 + i * (barHeight + spacing);
                const value = vector[i];
                const width = Math.abs(value) / maxValue * maxWidth;
                
                // Bar background
                ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
                ctx.fillRect(80, y, maxWidth, barHeight);
                
                // Bar value
                ctx.fillStyle = value >= 0 ? '#3fb950' : '#f85149';
                ctx.fillRect(80, y, width, barHeight);
                
                // Component index
                ctx.fillStyle = '#8b949e';
                ctx.fillText(`Dim ${i}:`, 20, y + barHeight/2 + 4);
                
                // Value text
                ctx.fillStyle = '#f0f6fc';
                ctx.fillText(value.toFixed(4), 90 + width, y + barHeight/2 + 4);
            }
            
            // Draw 3D projection if we have enough dimensions
            if (vector.length >= 3) {
                // 3D projection in the bottom right
                const size = Math.min(canvas.width, canvas.height) * 0.3;
                const centerX = canvas.width - size/2 - 20;
                const centerY = canvas.height - size/2 - 20;
                
                // Background for 3D viz
                ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
                ctx.fillRect(centerX - size/2, centerY - size/2, size, size);
                
                // Draw 3D axes
                ctx.strokeStyle = '#58a6ff';
                ctx.lineWidth = 1;
                
                // X axis (red)
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(centerX + size/3, centerY);
                ctx.strokeStyle = '#f85149';
                ctx.stroke();
                
                // Y axis (green)
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(centerX, centerY - size/3);
                ctx.strokeStyle = '#3fb950';
                ctx.stroke();
                
                // Z axis (blue)
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(centerX - size/4, centerY + size/4);
                ctx.strokeStyle = '#58a6ff';
                ctx.stroke();
                
                // Draw the vector in 3D space
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                const x3d = vector[0] / maxValue * size/3;
                const y3d = -vector[1] / maxValue * size/3;
                const z3d = -vector[2] / maxValue * size/4;
                ctx.lineTo(centerX + x3d - z3d, centerY + y3d + z3d);
                ctx.strokeStyle = '#d29922';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Draw endpoint
                ctx.fillStyle = '#d29922';
                ctx.beginPath();
                ctx.arc(centerX + x3d - z3d, centerY + y3d + z3d, 4, 0, Math.PI * 2);
                ctx.fill();
                
                // Label
                ctx.fillStyle = '#f0f6fc';
                ctx.font = '12px "Segoe UI", sans-serif';
                ctx.fillText('3D Projection', centerX - 40, centerY - size/2 - 10);
            }
        }
        
        // Panel resizer functionality
        const panelResizer = document.getElementById('panelResizer');
        const editorContainer = document.getElementById('editor-container');
        const editor = document.getElementById('editor');
        const panelContainer = document.querySelector('.panel-container');
        
        let isResizing = false;
        
        panelResizer.addEventListener('mousedown', (e) => {
            isResizing = true;
            document.body.style.cursor = 'row-resize';
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            
            const editorRect = editorContainer.getBoundingClientRect();
            const y = e.clientY - editorRect.top;
            
            // Calculate percentages
            const editorPercent = (y / editorRect.height) * 100;
            const panelPercent = 100 - editorPercent;
            
            // Enforce min heights
            if (editorPercent < 20 || panelPercent < 10) return;
            
            // Apply new heights
            editor.style.height = `${editorPercent}%`;
            panelContainer.style.height = `${panelPercent}%`;
            
            // Resize terminal if visible
            if (document.getElementById('terminal').style.display