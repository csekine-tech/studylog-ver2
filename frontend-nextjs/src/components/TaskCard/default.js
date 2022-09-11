import Stars from '../Stars'
const TaskCard = ({
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
        <div className="col-md-6 p-1">
            <div className={`c-card u-bg--${color}`}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <p className="c-card__title">{title}</p>
                        <p className="c-card__subtitle">
                            {chapter && chapter + '章 '}
                            <span className="u-text-18">{number}</span>番
                        </p>
                    </div>
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
                        className="u-text--white u-text-12 align-self-start pl-1"
                        onClick={openModalHandler}>
                        <i className="fas fa-edit"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TaskCard
