
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { recipes, Recipe } from '@/data/recipes';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Clock, Users, ChevronLeft, Share, Bookmark } from 'lucide-react';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  
  useEffect(() => {
    const foundRecipe = recipes.find(r => r.id === id);
    if (foundRecipe) {
      setRecipe(foundRecipe);
    }
  }, [id]);
  
  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Рецепт не найден</h2>
          <p className="mb-6">Извините, запрошенный рецепт не существует или был удален.</p>
          <Button asChild>
            <Link to="/">Вернуться на главную</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Назад к рецептам
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {recipe.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">{recipe.description}</p>
            
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Подготовка</p>
                  <p className="font-medium">{recipe.prepTime}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Приготовление</p>
                  <p className="font-medium">{recipe.cookTime}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Порций</p>
                  <p className="font-medium">{recipe.servings}</p>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Ингредиенты</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
            
            <h2 className="text-2xl font-bold mb-4">Процесс приготовления</h2>
            <ol className="list-decimal pl-6 mb-8 space-y-4">
              {recipe.steps.map((step, idx) => (
                <li key={idx} className="pl-2">{step}</li>
              ))}
            </ol>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-primary/5 rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Сохраните рецепт</h3>
              
              <div className="flex gap-3 mb-6">
                <Button className="flex-1">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Сохранить
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share className="h-4 w-4 mr-2" />
                  Поделиться
                </Button>
              </div>
              
              <Separator className="my-6" />
              
              <h3 className="text-xl font-bold mb-4">Советы</h3>
              <ul className="space-y-3">
                <li className="bg-background rounded p-3">
                  <p className="text-sm">Попробуйте добавить кунжутное масло в готовое блюдо для более насыщенного вкуса.</p>
                </li>
                <li className="bg-background rounded p-3">
                  <p className="text-sm">В Корее это блюдо часто подают с корейскими маринованными овощами.</p>
                </li>
                <li className="bg-background rounded p-3">
                  <p className="text-sm">Уровень остроты можно регулировать количеством добавляемой пасты кочуджан.</p>
                </li>
              </ul>
            </div>
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

export default RecipeDetail;
