import Homepage from "./Homepage";

interface IndexProps {
  images?: Record<string, string>;
}

const Index = ({ images = {} }: IndexProps) => {
  return <Homepage images={images} />;
};

export default Index;
