import React from 'react'
import PEOPLE from '../../../assets/mocks/PEOPLE.json'
import PEOPLE_SKILLS from '../../../assets/mocks/PEOPLE_SKILLS.json'
import PEOPLE_TAGS from '../../../assets/mocks/PEOPLE_TAGS.json'
import TAGS from '../../../assets/mocks/TAGS.json'
import SKILLS from '../../../assets/mocks/SKILLS.json'
import { useNavigate } from "react-router-dom"
import { Avatar, Chip, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import _ from 'lodash'

const SearchResults = ({ searchText }) => {
    const navigate = useNavigate();

    const filteredPeopleByName = PEOPLE.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()))
    
    const findSkillsIdsIncludesSearch = SKILLS.filter(s => s.name.toLowerCase().includes(searchText.toLowerCase())).map(skill => skill.id)
    const findPeopleIdWithSkillId = PEOPLE_SKILLS.filter(ps => findSkillsIdsIncludesSearch.includes(ps.skillId)).map(ps => ps.personId)
    const filteredPeopleByTag = PEOPLE.filter(p => findPeopleIdWithSkillId.includes(p.id))

    const filteredPeople = [...filteredPeopleByName, ...filteredPeopleByTag]

    const handleClick = (e) => {
        navigate(`/profile/${e.currentTarget.id}`)
    }


    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {filteredPeople.length
                ? filteredPeople.map(p => {
                    const peopleSkills = PEOPLE_SKILLS.filter(ps => ps.personId === p.id)
                    const peopleTags = PEOPLE_TAGS.filter(pt => pt.personId === p.id)

                    const skillsInfo = peopleSkills.map(pSkill => SKILLS.find(skill => skill.id === pSkill.skillId))
                    const tagsInfo = peopleTags.map(pTag => TAGS.find(tag => tag.id === pTag.tagId))

                    return (
                        <ListItem alignItems="flex-start" id={p.id} onClick={handleClick} style={{ cursor: 'pointer' }}>
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
                                            {tagsInfo.map(tag => <Chip style={{ marginLeft: '5px', marginTop: '5px' }} size='small' label={tag.name} className='chip' />)}
                                        </Grid>
                                    </Grid>
                                }
                            />
                        </ListItem>
                    )
                })
                : <ListItem alignItems="flex-start" dir='ltr'>
                    No results. You can allways ask Ofir for help.
                </ListItem>}
        </List>
    )
}

export default SearchResults