
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface RecipeProps {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  difficulty: "Легко" | "Средне" | "Сложно";
  tags: string[];
}

const RecipeCard = ({ id, title, description, image, prepTime, difficulty, tags }: RecipeProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={image || "/placeholder.svg"} 
          alt={title} 
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant={
            difficulty === "Легко" ? "default" : 
            difficulty === "Средне" ? "secondary" : "destructive"
          }>
            {difficulty}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-accent/40">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">⏱️ {prepTime}</div>
        <Button asChild size="sm">
          <Link to={`/recipe/${id}`}>Посмотреть</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
