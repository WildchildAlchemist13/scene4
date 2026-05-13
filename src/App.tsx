/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Books } from './pages/Books';
import { BookDetail } from './pages/BookDetail';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { CheatSheet } from './pages/CheatSheet';
import { Hooks } from './pages/Hooks';
import { Learn } from './pages/Learn';
import { Article } from './pages/Article';
import { FAQ } from './pages/FAQ';
import { RefundPolicy } from './pages/RefundPolicy';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Storefront */}
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/checkout/:id" element={<Checkout />} />

            {/* Free / lead-magnet */}
            <Route path="/free/cheat-sheet" element={<CheatSheet />} />
            <Route path="/free/hooks" element={<Hooks />} />

            {/* Content */}
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/:slug" element={<Article />} />

            {/* Brand + policy */}
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
