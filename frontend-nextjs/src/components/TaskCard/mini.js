import Stars from '../Stars'
const TaskCardMini = ({
    color = 'gray',
    rate,
    id,
    title,
    chapter = null,
    number,
    openModalHandler,
    date=null
}) => {
    return (
        <div className="mb-2">
            <div className={`c-card--sm u-bg--${color}`}>
                <div className="">
                    <div className="mb-1">
                        <p className="c-card__title">{title}</p>
                        <p className="c-card__subtitle">
                            {chapter && chapter + '章 '}
                            <span className="u-text-18">{number}</span>番
                        </p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="c-star__wrapper">
                            <Stars
                                rate={rate}
                                edit={true}
                                color2={'#F4CA42'}
                                color1={'#696969'}
                                // onChange={onChange}
                                initialRate={4}
                            />
                        </div>
                        <div
                            className="u-text--white u-text-12 pl-1 align-self-center"
                            onClick={openModalHandler}>
                            <i className="fas fa-edit"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TaskCardMini
