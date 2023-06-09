import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { GiftItem } from "types";

interface Error {
    message: string
}

interface GiftTableRowProps {
    gift: GiftItem
    onGiftsChange: () => void
 }


export const GiftTableRow = ({gift, onGiftsChange }: GiftTableRowProps) => {
    const onDeleteGiftItem = async (e: MouseEvent)=> {
        if(!window.confirm(`Are you sure you want to delete ${gift.name}?`)) return;

        const response = await fetch(`http://localhost:3000/gift/${gift._id}`, {
            method: 'DELETE',
        })

        if([400,500].includes(response.status)){
            const error = response.json() as unknown as Error


             alert(`Error occurred: ${error.message}`)
        }

        onGiftsChange()

    }

    return(
        <tr>
            <td>
                <Link to={`/gift/${gift._id}`}>
                    {gift.name}
                </Link>
                </td>
            <td>{gift.amount}</td>
            <td><button onClick={onDeleteGiftItem}>🗑</button></td>
        </tr>
    )
}