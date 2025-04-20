
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface FeaturedRecipeProps {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  tags: string[];
}

const FeaturedRecipe = ({ id, title, description, image, prepTime, tags }: FeaturedRecipeProps) => {
  return (
    <div className="relative rounded-lg overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      
      <div className="relative px-6 py-16 sm:px-12 sm:py-24 lg:py-32 flex flex-col items-start max-w-3xl">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} className="bg-primary-foreground text-primary">
              {tag}
            </Badge>
          ))}
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-3 sm:text-4xl">{title}</h2>
        <p className="text-lg text-white/90 mb-6 max-w-xl">{description}</p>
        
        <div className="flex items-center text-white/80 mb-6">
          <span className="mr-6">⏱️ {prepTime}</span>
        </div>
        
        <Button size="lg" asChild>
          <Link to={`/recipe/${id}`}>Показать рецепт</Link>
        </Button>
      </div>
    </div>
  );
};

export default FeaturedRecipe;
