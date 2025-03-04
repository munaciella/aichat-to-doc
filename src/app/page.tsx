import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
      <main className="">
        <h1>Lets build a SASS AI App</h1>
        <ThemeToggle />
        <Button
        variant="destructive"
        >Click me</Button>
      </main>
      
  );
}
