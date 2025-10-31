import  { useState } from 'react';
import { motion } from 'framer-motion';
import ResumeFile from './QF-Data Analysis Associate.pdf_.pdf';

export default function Resume() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 py-8 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">My Resume</h1>
          <p className="text-gray-400 text-lg">Data Analysis Associate - Professional Profile</p>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.a
            href={ResumeFile}
            download="QF-Data-Analysis-Associate-Resume.pdf"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-blue-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </motion.a>

          <motion.button
            onClick={() => window.open(ResumeFile, '_blank')}
            className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open in New Tab
          </motion.button>
        </motion.div>

        {/* PDF Container */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* PDF Embed */}
          <iframe
            src={`${ResumeFile}#view=FitH`}
            className="w-full h-[70vh]"
            title="Resume PDF Viewer"
            onLoad={() => setIsLoading(false)}
            style={{ display: isLoading ? 'none' : 'block' }}
          />
        </motion.div>

        {/* Footer Info */}
        <motion.div
          className="text-center mt-6 text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>File: QF-Data-Analysis-Associate-Resume.pdf</p>
          <p className="mt-2">For best experience, download the PDF and open in Adobe Acrobat Reader</p>
        </motion.div>
      </motion.div>
    </div>
  );
}