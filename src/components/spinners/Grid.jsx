import { Grid } from 'react-loader-spinner';

export default function LoadingGrid() {

    return (
        <Grid
            height="40"
            width="40"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
    )
}