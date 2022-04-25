import React from 'react'
import PEOPLE from '../../../assets/mocks/PEOPLE.json'
import PEOPLE_SKILLS from '../../../assets/mocks/PEOPLE_SKILLS.json'
import PEOPLE_TAGS from '../../../assets/mocks/PEOPLE_TAGS.json'
import TAGS from '../../../assets/mocks/TAGS.json'
import SKILLS from '../../../assets/mocks/SKILLS.json'

import { Avatar, Chip, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import _ from 'lodash'

const SearchResults = ({ searchText }) => {
    const filteredPeopleByName = PEOPLE.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()))


    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {filteredPeopleByName.map(p => {
                const peopleSkills = PEOPLE_SKILLS.filter(ps => ps.personId === p.id)
                const peopleTags = PEOPLE_TAGS.filter(pt => pt.personId === p.id)

                const skillsInfo = peopleSkills.map(pSkill => SKILLS.find(skill => skill.id === pSkill.skillId))
                const tagsInfo = peopleTags.map(pTag => TAGS.find(tag => tag.id === pTag.tagId))

                return (
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={`${p.name}-img`} src={p.imgURL} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={p.name}
                            secondary={
                                <Grid container direction="column">
                                    <Grid item>
                                        {_.join(skillsInfo.map(skill => skill.name), ', ')}
                                    </Grid>

                                    <Grid item>
                                        {tagsInfo.map(tag => <Chip size='small' label={tag.name} className='chip' />)}
                                    </Grid>
                                </Grid>
                            }
                        />
                    </ListItem>
                )
            })}
        </List>
    )
}

export default SearchResults