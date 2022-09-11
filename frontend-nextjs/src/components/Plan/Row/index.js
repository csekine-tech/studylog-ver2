import Stars from '@/components/Stars'

const PlanRow = ({ number, isFinished, rate, counts }) => {
    return (
        <tr>
            <td className={isFinished ? 'is_finished' : ''}>{number}</td>
            <td>
                {isFinished ? (
                    'マスター済み'
                ) : (
                    <input type="date" name="" id="" />
                )}
            </td>
            <td>{counts}</td>
            <td>
                <Stars
                    rate={3}
                    edit={true}
                    color2={'#F4CA42'}
                    color1={'#696969'}
                    // onChange={onChange}
                    initialRate={4}
                />
            </td>
        </tr>
    )
}
export default PlanRow
