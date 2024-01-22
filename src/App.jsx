import { Button } from '@/components/ui/button';

function App() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 h-screen p-4 gap-4">
      <div className="col-start-1 col-end-2 bg-red-100">grafik co2</div>
      <div className="col-start-1 col-end-2 bg-red-100">grafik temp</div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-3 bg-red-100">
        excel
      </div>
    </div>
  );
}

export default App;
