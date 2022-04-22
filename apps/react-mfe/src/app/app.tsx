// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link, Route, Routes } from 'react-router-dom';


export function App() {
/*   const navigate = useNavigate();
  const location = useLocation();

  //useEffect(() => {
    function nav(data: any, unused: string, url?: string | URL | null | undefined) {
      console.log(url, location);
      if (url !== location.pathname) {
        originalPushStateFn(data, unused, url);
      }
    }
    patchPushState(nav as any, { overwrite: true });
    patchReplaceState(replaceEventReplaceStateFn, { overwrite: true });
  //}); */

  return (
    <>
      <img src="http://localhost:4000/assets/icons/react-icon.svg" alt="React Logo" style={{width: '75px', height: '75px'}}></img>
      <h1>React App (Micro App)</h1>

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      {/* <br />
      <hr />
      <br /> */}
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/use-case-3">Use Case 3</Link>
          </li>
          <li>
            <Link to="(mfe-react:use-case-3//app-1:use-case-1)">Use Case 3, App-1 Use-Case-1</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <h3>home 3 works!</h3>
          }
        />
        <Route
          path="/use-case-3"
          element={
            <h3>use-case 3 works!</h3>
          }
        />
      </Routes>
      {/* END: routes */}
    </>
  );
}

export default App;
