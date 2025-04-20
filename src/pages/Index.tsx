
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import RecipeCard from '@/components/RecipeCard';
import FeaturedRecipe from '@/components/FeaturedRecipe';
import { getFeaturedRecipe, getRecentRecipes, searchRecipes, getAllTags } from '@/data/recipes';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Search, ChefHat, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchRecipes> | null>(null);
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const featuredRecipe = getFeaturedRecipe();
  const recentRecipes = getRecentRecipes(6);
  
  useEffect(() => {
    // Get all tags for filtering
    const allTags = getAllTags();
    setPopularTags(allTags.slice(0, 6)); // Display only first 6 tags
  }, []);
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = searchRecipes(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults(null);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setSearchResults(searchRecipes(tag));
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
        {!searchResults && (
          <section className="container my-8">
            {featuredRecipe && (
              <FeaturedRecipe
                id={featuredRecipe.id}
                title={featuredRecipe.title}
                description={featuredRecipe.description}
                image={featuredRecipe.image}
                prepTime={featuredRecipe.prepTime}
                tags={featuredRecipe.tags}
              />
            )}
          </section>
        )}
        
        {/* Search section */}
        <section className="container my-12">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                className="pl-10 py-6 text-lg"
                placeholder="Найти рецепт, ингредиент или тег..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Button 
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={handleSearch}
              >
                Поиск
              </Button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground flex items-center mr-2">
                <Tag className="mr-1 h-3 w-3" /> Популярные теги:
              </span>
              {popularTags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="bg-primary/10 hover:bg-primary/20 cursor-pointer"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>
        
        {/* Search results */}
        {searchResults && (
          <section className="container my-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Результаты поиска: {searchQuery}</h2>
              <Button variant="outline" onClick={() => setSearchResults(null)}>Сбросить</Button>
            </div>
            <Separator className="mb-8" />
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                    description={recipe.description}
                    image={recipe.image}
                    prepTime={recipe.prepTime}
                    difficulty={recipe.difficulty}
                    tags={recipe.tags}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-medium mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground mb-6">
                  К сожалению, мы не нашли рецептов, соответствующих запросу "{searchQuery}"
                </p>
                <Button onClick={() => setSearchResults(null)}>Вернуться к рецептам</Button>
              </div>
            )}
          </section>
        )}
        
        {/* Recent recipes - show only if not searching */}
        {!searchResults && (
          <section className="container my-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Популярные рецепты</h2>
              <Button variant="ghost" onClick={() => navigate('/recipes')}>Смотреть все</Button>
            </div>
            <Separator className="mb-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  description={recipe.description}
                  image={recipe.image}
                  prepTime={recipe.prepTime}
                  difficulty={recipe.difficulty}
                  tags={recipe.tags}
                />
              ))}
            </div>
          </section>
        )}
        
        {/* Info section - show only if not searching */}
        {!searchResults && (
          <section className="bg-primary/5 py-16 my-12">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Корейская кулинарная традиция</h2>
                <p className="text-lg mb-6">
                  Откройте для себя богатство корейской кухни с её уникальными вкусами, 
                  ароматами и техниками. От острого кимчи до сытного бибимбапа — наша 
                  кулинарная книга поможет вам воссоздать аутентичные корейские блюда дома.
                </p>
                <Button size="lg" onClick={() => navigate('/about')}>Подробнее о кухне Кореи</Button>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Корейская Кулинария</h3>
              <p className="text-primary-foreground/80">© 2023 Все права защищены</p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">О проекте</Button>
              <Button variant="ghost" size="sm">Контакты</Button>
              <Button variant="ghost" size="sm">Политика конфиденциальности</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
