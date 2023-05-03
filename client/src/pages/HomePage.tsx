import { NavbarSimple } from "../components/Sidebar";

const data = [
    { link: '', label: 'Room 1', },
    { link: '', label: 'Room 2',  },
    { link: '', label: 'Room 3',  },
    { link: '', label: 'Room 4',  },

  ];

export function HomePage() {
    return(
        <div>
            <h1>hello homepage</h1>
            <NavbarSimple data={data} />
        </div>
    )
}