
import { useState } from 'react';
import Header from '@/components/Header';
import RecipeCard from '@/components/RecipeCard';
import FeaturedRecipe from '@/components/FeaturedRecipe';
import { getFeaturedRecipe, getRecentRecipes } from '@/data/recipes';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredRecipe = getFeaturedRecipe();
  const recentRecipes = getRecentRecipes(6);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
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
        
        {/* Search section */}
        <section className="container my-12">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                className="pl-10 py-6 text-lg"
                placeholder="Найти рецепт..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>
        
        {/* Recent recipes */}
        <section className="container my-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Популярные рецепты</h2>
            <Button variant="ghost">Смотреть все</Button>
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
        
        {/* Info section */}
        <section className="bg-primary/5 py-16 my-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Корейская кулинарная традиция</h2>
              <p className="text-lg mb-6">
                Откройте для себя богатство корейской кухни с её уникальными вкусами, 
                ароматами и техниками. От острого кимчи до сытного бибимбапа — наша 
                кулинарная книга поможет вам воссоздать аутентичные корейские блюда дома.
              </p>
              <Button size="lg">Подробнее о кухне Кореи</Button>
            </div>
          </div>
        </section>
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
