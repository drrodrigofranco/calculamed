#!/usr/bin/env python3
"""
Simple HTTP Server for Remote File Access
Serves files from a specified directory over HTTP with directory listing enabled.
Usage: python3 file_server.py [directory] [port]
"""

import http.server
import socketserver
import os
import sys
import urllib.parse
from pathlib import Path

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers to allow cross-origin requests
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def log_message(self, format, *args):
        # Enhanced logging
        print(f"[{self.log_date_time_string()}] {format % args}")

    def translate_path(self, path):
        # Override to prevent directory traversal attacks
        path = urllib.parse.unquote(path)
        words = path.split('/')
        words = filter(None, words)
        path = os.getcwd()
        for word in words:
            if os.path.dirname(word) or word in (os.curdir, os.pardir):
                continue
            path = os.path.join(path, word)
        return path

def main():
    # Parse command line arguments
    serve_dir = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser("~")
    port = int(sys.argv[2]) if len(sys.argv) > 2 else 8888

    # Validate directory exists
    serve_dir = os.path.abspath(serve_dir)
    if not os.path.isdir(serve_dir):
        print(f"Error: Directory '{serve_dir}' does not exist")
        sys.exit(1)

    # Change to the serving directory
    os.chdir(serve_dir)

    # Create server
    handler = MyHTTPRequestHandler
    with socketserver.TCPServer(("0.0.0.0", port), handler) as httpd:
        print("=" * 60)
        print("File Server Starting")
        print("=" * 60)
        print(f"Serving directory: {serve_dir}")
        print(f"Server running at:")
        print(f"  http://0.0.0.0:{port}")
        print(f"  http://localhost:{port}")
        print(f"\nRemote access (adjust IP):")
        print(f"  http://<your-vps-ip>:{port}")
        print("\nDirectory listing enabled. Press Ctrl+C to stop.")
        print("=" * 60)

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            sys.exit(0)

if __name__ == "__main__":
    main()
