import { ThemeProvider } from '../contexts/ThemeContext';
import '../app/globals.css'; // Assuming this path is correct

// This function wraps all your pages
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider> {/* Wrap pages with ThemeProvider */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
