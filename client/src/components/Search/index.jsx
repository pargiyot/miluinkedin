// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from "react";
import './index.css';
import SearchResults from './SearchResults'
import { Grid } from '@mui/material'

export default () => {
    const [searchText, setSearchText] = useState('')

    // const theme = useTheme();
    // const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div className="container">
            <Grid container direction="column" justify="center" align="center" spacing={2}>
                <Grid item>
                    <input
                        className="search-input"
                        placeholder="חפש מילואימניק"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                    />
                </Grid>

                <Grid item>
                    <SearchResults searchText={searchText} />
                </Grid>
            </Grid>
        </div>
    )
}