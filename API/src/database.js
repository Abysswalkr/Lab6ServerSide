/* eslint-disable no-throw-literal */
import fs from 'fs';
import conn from './connection.js';

export function writeToLog(endpoint, payload, response) {
  const logMessage = `Endpoint: ${endpoint}\nTime: ${new Date().toISOString()}\nPayload: ${JSON.stringify(payload)}\nResponse: ${JSON.stringify(response)}\n\n`;
  fs.appendFile('log.txt', logMessage, (err) => {
    if (err) {
      console.error('Error al escribir en el archivo de registro:', err);
    }
  });
}

export async function getAllPosts() {
  try {
    const [rows] = await conn.query('SELECT * FROM futbol');
    const response = { success: true, data: rows };
    writeToLog('/getAllPosts', null, response);
    return rows;
  } catch (error) {
    console.error('Error al obtener posts:', error);
    throw { status: 500, message: 'Error interno del servidor' };
  }
}

export async function getPostById(id) {
  try {
    const [rows] = await conn.query('SELECT * FROM futbol WHERE id = ?', [id]);
    if (rows.length === 0) {
      throw { status: 404, message: 'Post no encontrado' };
    }
    const response = { success: true, data: rows[0] };
    writeToLog(`/getPostById/${id}`, null, response);
    return rows[0];
  } catch (error) {
    console.error('Error al obtener el post:', error);
    if (error.status) {
      throw error;
    } else {
      throw { status: 500, message: 'Error interno del servidor' };
    }
  }
}

export async function deletePostById(id) {
  try {
    const result = await conn.query('DELETE FROM futbol WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw { status: 404, message: 'Post no encontrado' };
    }
    const response = { success: true, message: 'Post eliminado correctamente' };
    writeToLog(`/deletePostById/${id}`, null, response);
    return result;
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    if (error.status) {
      throw error;
    } else {
      throw { status: 500, message: 'Error interno del servidor' };
    }
  }
}

export async function updatePostById(id, titulo, descripcion, imagen, autor) {
  if (!id || !titulo || !descripcion || !imagen || !autor) {
    throw { status: 400, message: 'Formato de datos incorrecto' };
  }
  try {
    const result = await conn.query('UPDATE futbol SET titulo = ?, descripcion = ?, imagen = ?, autor = ? WHERE id = ?', [titulo, descripcion, imagen, autor, id]);
    if (result.affectedRows === 0) {
      throw { status: 404, message: 'Post no encontrado' };
    }
    const response = { success: true, message: 'Post actualizado correctamente' };
    writeToLog(`/updatePostById/${id}`, {
      titulo, descripcion, imagen, autor,
    }, response);
    return result;
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    if (error.status) {
      throw error;
    } else {
      throw { status: 500, message: 'Error interno del servidor' };
    }
  }
}

export async function addPost(titulo, descripcion, imagen, autor) {
  if (!titulo || !descripcion || !imagen || !autor) {
    throw { status: 400, message: 'Formato de datos incorrecto' };
  }
  try {
    const result = await conn.query('INSERT INTO futbol (titulo, descripcion, imagen, autor) VALUES (?, ?, ?, ?)', [titulo, descripcion, imagen, autor]);
    const response = { success: true, message: 'Post añadido correctamente' };
    writeToLog('/addPost', {
      titulo, descripcion, imagen, autor,
    }, response);
    return result;
  } catch (error) {
    console.error('Error al añadir el post:', error);
    throw { status: 500, message: 'Error interno del servidor' };
  }
}
