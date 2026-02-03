import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./api";

function App() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: -23.5489, lon: -46.6388 }),
  });

  return <>{JSON.stringify(data)}</>;
}

export default App;
