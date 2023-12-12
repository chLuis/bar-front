import { AgendaDogs, LogoLengua, BtnHome, Navbar } from '../../components'

export const AgendaDogsPage = () => {
    return (
        <>
            <LogoLengua />
            <Navbar route="Agenda"/>
            <AgendaDogs />
            <BtnHome />
        </>
    )
}