import { LogoLengua, BtnHome, NuestroSalon, Navbar } from '../../components'

export const NuestroSalonPage = () => {
    return (
    <>
        <Navbar route={"Salón"} />
        <LogoLengua/>
        <NuestroSalon />
        <BtnHome/>
    </>
  )
}