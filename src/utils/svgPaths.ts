// src/utils/svgPaths.ts
export const loadSvgPaths = async (): Promise<string[]> => {
    try {
      // Load the file list
      const fileListResponse = await fetch('/media/collaborators/fileList.json');
      const fileList: string[] = await fileListResponse.json();
      
      const svgPaths: string[] = [];
      
      // Load each SVG file
      for (const file of fileList) {
        try {
          const response = await fetch(`/media/collaborators/${file}`);
          const svgText = await response.text();
          
          // Extract path data
          const parser = new DOMParser();
          const doc = parser.parseFromString(svgText, 'image/svg+xml');
          const pathElement = doc.querySelector('path');
          
          if (pathElement && pathElement.getAttribute('d')) {
            svgPaths.push(pathElement.getAttribute('d')!);
          }
        } catch (fileError) {
          console.error(`Error loading ${file}:`, fileError);
        }
      }
      
      return svgPaths;
    } catch (error) {
      console.error('Error loading SVG paths:', error);
      return [];
    }
  };