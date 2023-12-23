import { Grid } from 'react-loader-spinner';

// grid spinner component
// used when loading account login and registration, as well as pokemon and appointment creation

export default function LoadingGrid() {

    return (
        <Grid
            height="40"
            width="40"
            color="#93F7A7"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
    )
}