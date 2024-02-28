// src/components/ThemeToggle.tsx
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="toggle-theme  mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
