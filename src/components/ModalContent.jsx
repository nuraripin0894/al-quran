import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography, Modal } from "@mui/material";

class ModalContent extends React.Component {
  render() {
    const { open, onClose, contentType, content } = this.props;

    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "600px",
            maxHeight: "28rem",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            paddingX: 4,
            paddingY: 2,
            outline: "none",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ fontFamily: "uthmanScript", fontWeight: "bold" }}
          >
            {contentType === "dua"
              ? content?.judul
              : "Tafsir - Kementrian Agama Islam"}
          </Typography>
          <div className="border-b-2 border-t-2 mt-4 pb-4">
            <Typography
              id="modal-description"
              sx={{ mt: 2, fontFamily: "uthmanScript" }}
            >
              {contentType === "dua" ? (
                <>
                  <Typography
                    sx={{
                      mt: 2,
                      fontFamily: "uthman",
                      textAlign: "justify",
                      direction: "rtl",
                      fontSize: "25px",
                      fontWeight: "semi-bold",
                    }}
                  >
                    {content?.arab}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2,
                      fontFamily: "uthmanScript",
                      textAlign: "justify",
                      fontStyle: "italic",
                    }}
                    className="text-gray-700"
                  >
                    {'"' + content?.indo + '"'}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      mt: 2,
                      fontFamily: "uthmanScript",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {content?.head}
                  </Typography>
                  <Typography
                    sx={{ mt: 2, fontFamily: "uthmanScript" }}
                    className="text-gray-700"
                  >
                    {content?.content}
                  </Typography>
                </>
              )}
            </Typography>
          </div>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={onClose} variant="outlined" color="primary">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }
}

ModalContent.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  contentType: PropTypes.oneOf(["dua", "verse"]).isRequired,
  content: PropTypes.shape({
    judul: PropTypes.string,
    arab: PropTypes.string,
    indo: PropTypes.string,
    head: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default ModalContent;
