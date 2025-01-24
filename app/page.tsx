import Support from "@/components/Support/Support";
import Header from "@/components/Header/Header";
import Content from "@/components/Content/Content";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

export default function Home() {
  return (
      <>
        <Support/>
        <Header/>
        <Content/>
        <div className="container px-4">
        <VelocityScroll>MEMO GAMES</VelocityScroll>
        </div>
      </>
  );
}
