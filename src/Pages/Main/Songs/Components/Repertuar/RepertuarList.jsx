import { selectLists } from 'Store/main/listsSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RepertuarListItem from './RepertuarListItem';
import { getListByUser } from 'Store/main/listsSlice';
import Loading from 'Components/Loading/Loading';
import MustLogin from '../MustLogin';
import Repertuars from '../../../Account/Repertuars/Components/Repertuars';

function RepertuarList() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const lists = useSelector(selectLists);
  const { settings } = useSelector((state) => state.applicationSlice);
  const { isAuthenticated, userId } = useSelector((state) => state.auth);



  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getListByUser(userId)).then(() => setLoading(false));
    }
    else {
      setLoading(false);
    }
  }, [dispatch, isAuthenticated, userId])


  


  if (settings.showRepertuarList) {

    if (loading) {
      return <Loading />
    }


    if (!isAuthenticated) {
      return <MustLogin title={"Repertuara"}/>
    }

    


    if(lists.length === 0){
      return <Repertuars title={"Hiç Repertuarınız Yok"} button={"Repertuar Oluştur"} shadow={false}/>
    }




    return (
      <div className='m-2 flex flex-col'>
        {
          lists.map((item, key) => {
            return <RepertuarListItem key={key} item={item} />
          })
        }
      </div>
    )
  }

  return null;
}

export default RepertuarList