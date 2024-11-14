const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Track = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        album: {
            type: String,
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true;
                },
                message: 'ERROR_URL',
            },
        },
        artist: {
            name: {
                type: String,
            },
            nickname: {
                type: String,
            },
            nationality: {
                type: String,
            },
        },
        duration: {
            start: {
                type: Number,
            },
            end: {
                type: Number,
            },
        },
        mediaId: {
            type: mongoose.Types.ObjectId,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false,
    },
);

Track.plugin(
    mongooseDelete, 
    { 
        overrideMethods: 'all', 
    }
);

Track.statics.findAllData = function () {
    const joinData = this.aggregate([
      //TODO Tracks
      {
        $lookup: {
          from: "storages", //TODO Tracks --> storages
          localField: "mediaId", //TODO Tracks.mediaId
          foreignField: "_id", //TODO Straoges._id
          as: "audio", //TODO Alias!
        },
      },
      {
        $unwind: "$audio",
      }
    ]);

    return joinData;
};

Track.statics.findOneData = function (id) {
    const joinData = this.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "storages", //TODO Tracks --> storages
          localField: "mediaId", //TODO Tracks.mediaId
          foreignField: "_id", //TODO Straoges._id
          as: "audio", //TODO Alias!
        },
      },
      {
        $unwind: "$audio",
      }
    ]);

    return joinData;
};

module.exports = mongoose.model('tracks', Track);
