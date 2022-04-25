import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from "react";
import './index.css';
import SearchResults from './SearchResults'
import { Grid } from '@mui/material'

export default () => {
    const [searchText, setSearchText] = useState('')

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div className="container" style={{height: '100%'}}>
            <Grid container direction="column" justify="center" align="center" spacing={2} style={{ height: '100%', margin: 0 }}>
                <Grid item>
                    <input
                        style={{
                            width: matches ? 370 : 700
                        }}
                        className="search-input"
                        placeholder="חפש מילואימניק"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                    />
                </Grid>

                {searchText &&
                    <Grid item>
                        <SearchResults searchText={searchText} />
                    </Grid>}
            </Grid>
        </div>
    )
}