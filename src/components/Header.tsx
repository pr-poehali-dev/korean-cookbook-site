
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-background border-b py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-6">
            <h1 className="text-xl font-bold flex items-center">
              <span className="text-primary">🍲</span>
              <span className="ml-2">К-Кулинария</span>
            </h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </Link>
            <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              Категории
            </Link>
            <Link to="/popular" className="text-sm font-medium hover:text-primary transition-colors">
              Популярное
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              О проекте
            </Link>
          </nav>
        </div>

        <div className="flex items-center">
          {isSearchOpen ? (
            <div className="relative hidden md:flex items-center">
              <Input 
                type="search" 
                placeholder="Поиск рецептов..." 
                className="w-[300px] pr-8"
              />
              <X 
                className="absolute right-2 h-4 w-4 text-muted-foreground cursor-pointer" 
                onClick={() => setIsSearchOpen(false)}
              />
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex" 
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-6 border-t">
          <div className="container space-y-4">
            <div className="relative">
              <Input 
                type="search" 
                placeholder="Поиск рецептов..." 
                className="w-full pr-8"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            
            <nav className="space-y-4">
              <Link 
                to="/" 
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Главная
              </Link>
              <Link 
                to="/categories" 
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Категории
              </Link>
              <Link 
                to="/popular" 
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Популярное
              </Link>
              <Link 
                to="/about" 
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                О проекте
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
