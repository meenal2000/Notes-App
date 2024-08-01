import React, { useEffect, useState } from 'react';
import { getGroups, createGroup } from '../api';
import { Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Dialog, TextField, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';

const GroupListContainer = styled.div`
  width: 250px;
  padding: 10px;
  background: #f8f9fa;
  position: relative;
`;

const StickyButton = styled(Button)`
  position: sticky;
  bottom: 10px;
  width: 100%;
`;

const GroupList = ({ setSelectedGroup }) => {
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', color: '' });

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await getGroups();
      setGroups(response.data);
    };
    fetchGroups();
  }, []);

  const handleCreateGroup = async () => {
    await createGroup(newGroup);
    setShowModal(false);
    const response = await getGroups();
    setGroups(response.data);
  };

  return (
    <GroupListContainer>
      <h2>Pocket Notes</h2>
      <List>
        {groups.map(group => (
          <ListItem button key={group._id} onClick={() => setSelectedGroup(group)}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: group.color }}>{group.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={group.name} />
          </ListItem>
        ))}
      </List>
      <StickyButton variant="contained" color="primary" onClick={() => setShowModal(true)}>
        <AddIcon /> Add Group
      </StickyButton>
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            type="text"
            fullWidth
            value={newGroup.name}
            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Choose Color"
            type="color"
            fullWidth
            value={newGroup.color}
            onChange={(e) => setNewGroup({ ...newGroup, color: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={handleCreateGroup}>Create</Button>
        </DialogActions>
      </Dialog>
    </GroupListContainer>
  );
};

export default GroupList;
