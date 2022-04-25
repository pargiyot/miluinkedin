import React from 'react'
import PEOPLE from '../../../assets/mocks/PEOPLE.json'
import PEOPLE_SKILLS from '../../../assets/mocks/PEOPLE_SKILLS.json'
import PEOPLE_TAGS from '../../../assets/mocks/PEOPLE_TAGS.json'
import TAGS from '../../../assets/mocks/TAGS.json'
import SKILLS from '../../../assets/mocks/Skills.json'

import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import _ from 'lodash'

const SearchResults = ({ searchText }) => {
    const filteredPeopleByName = PEOPLE.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()))


    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {filteredPeopleByName.map(p => {
                const peopleSkills = PEOPLE_SKILLS.filter(ps => ps.personId === p.id)
                const peopleTags = PEOPLE_TAGS.filter(pt => pt.personId === p.id)

                const skillsInfo = peopleSkills.map(pSkill => SKILLS.find(skill => skill.id === pSkill.skillId))
                const tagsInfo = peopleTags.map(pSkill => SKILLS.find(skill => skill.id === pSkill.skillId))

                return (
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={`${p.name}-img`} src={p.imgURL} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={p.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {p.rank}, {p.servePosition}
                                    </Typography>

                                    {_.join(skillsInfo.map(skill => skill.name), '~')}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                )
            })}
        </List>
    )
}

export default SearchResults