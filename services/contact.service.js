const Contact = require('../models/contact.model');
const formatResponse = require('../utilities/format.response')

const addTicket = async (ticket) => {
    const newTicket = await Contact.create(ticket);
    const result = await newTicket.save()
    if (result) {
        return formatResponse('SUCCESS', 'Ticket added successfully', result);
    } else {
        return formatResponse('ERROR', 'Fail to Add Ticket');
    }
}

const getAllTickets = async () => {
    const result = await Contact.find({});
    return formatResponse('SUCCESS', 'All Tickets', result);
}


const deleteTicket = async (id) => {
    const ticketToDelete = await Contact.findOneAndDelete({ _id: id });
    return formatResponse('SUCCESS', 'Ticket deleted successfully ', ticketToDelete);
}




module.exports = {
    addTicket,
    getAllTickets,
    deleteTicket,
   
}