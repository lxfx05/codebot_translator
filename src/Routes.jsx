import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import FileUploadContextPanel from './pages/file-upload-context-panel';
import LanguageSelectionModal from './pages/language-selection-modal';
import SettingsAndPreferences from './pages/settings-and-preferences';
import MainChatInterface from './pages/main-chat-interface';
import CodeOutputDisplay from './pages/code-output-display';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<MainChatInterface />} />
        <Route path="/file-upload-context-panel" element={<FileUploadContextPanel />} />
        <Route path="/language-selection-modal" element={<LanguageSelectionModal />} />
        <Route path="/settings-and-preferences" element={<SettingsAndPreferences />} />
        <Route path="/main-chat-interface" element={<MainChatInterface />} />
        <Route path="/code-output-display" element={<CodeOutputDisplay />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;