import { useState, useEffect } from 'react'
import './App.css'
import './index.css'
import Navbar from './components/Navbar'
import Inicio from './components/Inicio'
import Registro from './components/Registro'
import Actualizar from './components/Actualizar'
import Lista from './components/Lista'
import ProAxios from './components/ProAxios'

const proyectosIniciales = [
  {
    id: 1,
    codigo: "PRJ001",
    nombre: "Sistema de Inventario",
    estado: "En desarrollo",
    presupuesto: 3500000,
    avance: 45,
    tecnologias: ["React", "MySQL"],
    responsable: {
      nombre: "Carlos Muñoz",
      cargo: "Jefe de Proyecto"
    }
  },
  {
    id: 2,
    codigo: "PRJ002",
    nombre: "Portal de Ventas",
    estado: "Finalizado",
    presupuesto: 5200000,
    avance: 100,
    tecnologias: ["Java", "MySQL"],
    responsable: {
      nombre: "Fernanda Rojas",
      cargo: "Desarrollador"
    }
  },
  {
    id: 3,
    codigo: "PRJ003",
    nombre: "Aplicación de Gestión Escolar",
    estado: "En desarrollo",
    presupuesto: 4100000,
    avance: 68,
    tecnologias: ["React", "HTML", "Python"],
    responsable: {
      nombre: "Diego Castillo",
      cargo: "Jefe de Proyecto"
    }
  },
  {
    id: 4,
    codigo: "PRJ004",
    nombre: "Sistema de Reservas",
    estado: "Cancelado",
    presupuesto: 2800000,
    avance: 20,
    tecnologias: ["C++", "MySQL"],
    responsable: {
      nombre: "Valentina Pérez",
      cargo: "Diseñador"
    }
  },
  {
    id: 5,
    codigo: "PRJ005",
    nombre: "Plataforma E-Learning",
    estado: "En desarrollo",
    presupuesto: 6300000,
    avance: 81,
    tecnologias: ["React", "HTML", "MySQL"],
    responsable: {
      nombre: "Matías Soto",
      cargo: "Desarrollador"
    }
  }
];

function App() {

  const [vista, setVista] = useState("menu")
  const [vistaActualizar, setVistaActualizar] = useState("neutral")

  const [proyectos, setProyectos] = useState(() => {
    const localData = localStorage.getItem("proyectos");

    if (localData) {
      return JSON.parse(localData);
    }

    return proyectosIniciales;
  });

  useEffect(() => {
    localStorage.setItem("proyectos", JSON.stringify(proyectos));
  }, [proyectos]);

  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [avance, setAvance] = useState("");
  const [tecnologias, setTecnologias] = useState([]);
  const [nombreResponsable, setNombreResponsable] = useState("");
  const [cargoResponsable, setCargoResponsable] = useState("");

  const [proyectoBuscado, setProyectoBuscado] = useState("");
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  const AgregarProyecto = () => {
    let nuevoId = 1;
    while (proyectos.some(proyecto => proyecto.id === nuevoId)) {
        nuevoId++; 
    }

    while (proyectos.some(proyecto => proyecto.codigo === codigo)) {
      alert("El código del proyecto ya existe. Por favor, ingresa un código único.");
      return;
    }

    if (!codigo || !nombre || !estado || !presupuesto || !avance || tecnologias.length === 0 || !nombreResponsable || !cargoResponsable) {
      alert("Por favor, completa todos los campos antes de agregar el proyecto.");
      return;
    }

    const avanceNum = Number(avance);
    if (isNaN(avanceNum) || avanceNum < 0 || avanceNum > 100) {
      alert("El avance debe ser un número entre 0 y 100.");
      return;
    }

    const presupuestoNum = Number(presupuesto);
    if (isNaN(presupuestoNum) || presupuestoNum < 0) {
      alert("El presupuesto debe ser un número positivo.");
      return;
    }

    if (nombreResponsable.trim() === "" || cargoResponsable.trim() === "") {
      alert("El nombre y cargo del responsable no pueden estar vacíos.");
      return;
    }

    const nuevoProyecto = {
      id: nuevoId,
      codigo: codigo,
      nombre: nombre,
      estado: estado,
      presupuesto: presupuesto,
      avance: avance,
      tecnologias: tecnologias,
      responsable: {
        nombre: nombreResponsable,
        cargo: cargoResponsable
      }
    };
    
    setProyectos([...proyectos, nuevoProyecto]);

    setCodigo("");
    setNombre("");
    setEstado("");
    setPresupuesto("");
    setAvance("");
    setTecnologias([]);
    setNombreResponsable("");
    setCargoResponsable("");

    setVista("lista");
  }

  const EliminarProyecto = (id) => {
  setProyectos(proyectos.filter(proyecto => proyecto.id !== id));
  };

  
  const ProyectoLista = (idActualizar) => {
    const proyectoEncontrado = proyectos.find(proj => proj.id === idActualizar);
    setProyectoSeleccionado(proyectoEncontrado);
    setVistaActualizar("encontrado");
    setVista("actualizar");
  };

  return (
    <>
      <Navbar setVista={setVista}/>
      <main>
        {vista === "menu" && <Inicio setVista={setVista}/>}

        {vista === "registro" && <Registro
          codigo={codigo}
          setCodigo={setCodigo}
          nombre={nombre}
          setNombre={setNombre}
          estado={estado}
          setEstado={setEstado}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          avance={avance}
          setAvance={setAvance}
          tecnologias={tecnologias}
          setTecnologias={setTecnologias}
          nombreResponsable={nombreResponsable}
          setNombreResponsable={setNombreResponsable}
          cargoResponsable={cargoResponsable}
          setCargoResponsable={setCargoResponsable}
          AgregarProyecto={AgregarProyecto}
        />}

        {vista === "actualizar" && <Actualizar
          proyectoBuscado={proyectoBuscado}
          setProyectoBuscado={setProyectoBuscado}
          proyectoSeleccionado={proyectoSeleccionado}
          setProyectoSeleccionado={setProyectoSeleccionado}
          proyectos={proyectos}
          setProyectos={setProyectos}
          ProyectoLista={ProyectoLista}
          setVista={setVista} 
          vistaActualizar={vistaActualizar}
          setVistaActualizar={setVistaActualizar}
          
        />}

        {vista === "lista" && <Lista 
        proyectos={proyectos} 
        EliminarProyecto={EliminarProyecto}
        ProyectoLista={ProyectoLista}
        />}

        {vista === "axios" && <ProAxios/>}
      </main>
    </>
  )
}

export default App
