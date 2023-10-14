import Badge from "@mui/material/Badge";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
export const Counter = () => {

    let [like, setLike] = useState(0);
    let [disLike, setDislike] = useState(0);
  return (
    <div>
          <IconButton
              aria-label="like"
              color="success"
              onClick={() => setLike(like + 1)}
          >
              <Badge badgeContent={like} color="primary">
                  👍
              </Badge>
          </IconButton>
          <IconButton
              aria-label="dislike"
              color="error"
              onClick={() => setDislike(disLike + 1)}
          >
              <Badge badgeContent={disLike} color="error">
                  👎
              </Badge>
          </IconButton>
    </div>
  )
}