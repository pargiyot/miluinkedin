import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from "react";
import './index.css';
import SearchResults from './SearchResults'
import { Grid, Typography } from '@mui/material'
import { useAnimate } from 'react-simple-animate';
import React, { useEffect } from 'react';
import { getAllReservists, getAllSkills, getAllTags } from '../../api'


export default () => {
    const [searchText, setSearchText] = useState('')
    const [skills, setSkills] = useState([])
    const [tags, setTags] = useState([])
    const [reservists, setReservists] = useState([])

    const { style: headerTransitionStyle, play: playHeaderTransition } = useAnimate({ start: { marginTop: 'calc(50vh - 30px - 130px)' }, end: { marginTop: 0 } });

    useEffect(() => {
        const loadSkills = async () =>{
            const s = await getAllSkills();
            setSkills(s);
        }

        const loadTags = async() => {
            const t = await getAllTags();
            setTags(t);
        }

        const loadReservists = async () => {
            const r = await getAllReservists();
            setReservists(r)
        }
    
        loadSkills();
        loadTags();
        loadReservists();
    })

    useEffect(() => {
        playHeaderTransition(searchText)
    }, [searchText])

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div className="container" style={{ height: '100%' }}>
            <Grid container direction="column" justify="center" align="center" spacing={2} style={{ height: '100%', margin: 0 }}>
                <Grid item style={headerTransitionStyle}>
                    <Typography variant='h2'>המילואימניקים</Typography>


                    <input
                        style={{ width: matches ? 350 : 700, marginTop: 30 }}
                        className="search-input"
                        placeholder="חפש מילואימניק"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                    />
                </Grid>


                <Grid item>
                    {searchText && <SearchResults searchText={searchText} skills={skills} tags={tags} reservists={reservists} />}
                </Grid>
            </Grid>
        </div>
    )
}