
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import RecipeCard from '@/components/RecipeCard';
import { recipes, getAllTags, getRecipesByTag } from '@/data/recipes';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const RecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  
  useEffect(() => {
    setAllTags(getAllTags());
  }, []);
  
  useEffect(() => {
    let result = [...recipes];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(recipe => 
        recipe.title.toLowerCase().includes(query) || 
        recipe.description.toLowerCase().includes(query) || 
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query)) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by tag
    if (selectedTag) {
      result = result.filter(recipe => 
        recipe.tags.includes(selectedTag)
      );
    }
    
    // Filter by difficulty
    if (selectedDifficulty) {
      result = result.filter(recipe => 
        recipe.difficulty === selectedDifficulty
      );
    }
    
    setFilteredRecipes(result);
  }, [searchQuery, selectedTag, selectedDifficulty]);
  
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };
  
  const handleReset = () => {
    setSearchQuery('');
    setSelectedTag(null);
    setSelectedDifficulty(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <h1 className="text-4xl font-bold mb-6">Все рецепты</h1>
        <Separator className="mb-8" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-1/4 space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Сложность</label>
                  <Select 
                    value={selectedDifficulty || ""} 
                    onValueChange={(value) => setSelectedDifficulty(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите сложность" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="">Все</SelectItem>
                        <SelectItem value="Легко">Легко</SelectItem>
                        <SelectItem value="Средне">Средне</SelectItem>
                        <SelectItem value="Сложно">Сложно</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Категории</p>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant={selectedTag === tag ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleReset}
                >
                  Сбросить фильтры
                </Button>
              </div>
            </div>
          </div>
          
          {/* Recipe list */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  className="pl-10"
                  placeholder="Поиск по названию, ингредиентам или описанию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRecipes.map(recipe => (
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
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h3 className="text-2xl font-medium mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground mb-6">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
                <Button onClick={handleReset}>Сбросить все фильтры</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-primary text-primary-foreground py-8 mt-12">
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

export default RecipesPage;
