import MyLayout from "./components/MyLayout.jsx";
import {Routes, Route} from 'react-router-dom'
import ClassForm from "./pages/form/form.jsx";
import ClassPortal from "./pages/portal/portal.jsx";
function App() {
  return (
    <MyLayout>
        <Routes>
            <Route path="form" element={<ClassForm />} />
            <Route path="portal" element={<ClassPortal />} />
        </Routes>
        hello, I'm JunHong, how are you recently
    </MyLayout>
  )
}

export default App
