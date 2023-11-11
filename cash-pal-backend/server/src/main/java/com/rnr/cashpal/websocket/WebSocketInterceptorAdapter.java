//package com.rnr.cashpal.websocket;
//
//import org.apache.tomcat.util.codec.binary.Base64;
//import org.apache.tomcat.util.codec.binary.StringUtils;
//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
//import org.apache.tomcat.websocket.AuthenticationException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptorAdapter;
//import org.springframework.messaging.support.MessageHeaderAccessor;
//import org.springframework.security.access.AccessDeniedException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//
//@Component
//public class WebSocketAuthInterceptorAdapter extends ChannelInterceptorAdapter {
//
//    @Autowired
//    private DaoAuthenticationProvider userAuthenticationProvider;
//
//    @Override
//    public Message<?> preSend(final Message<?> message, final MessageChannel channel) throws AuthenticationException {
//
//        final StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
//        StompCommand cmd = accessor.getCommand();
//
//        if (StompCommand.CONNECT == cmd || StompCommand.SEND == cmd) {
//            Authentication authenticatedUser = null;
//            String authorization = accessor.getFirstNativeHeader("Authorization:");
//            String credentialsToDecode = authorization.split("\\s")[1];
//            String credentialsDecoded = StringUtils.newStringUtf8(Base64.decodeBase64(credentialsToDecode));
//            String[] credentialsDecodedSplit = credentialsDecoded.split(":");
//            final String username = credentialsDecodedSplit[0];
//            final String password = credentialsDecodedSplit[1];
//            authenticatedUser = userAuthenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(username, password));
//            if (authenticatedUser == null) {
//                throw new AccessDeniedException();
//            }
//            SecurityContextHolder.getContext().setAuthentication(authenticatedUser);
//            accessor.setUser(authenticatedUser);
//        }
//        return message;
//    }
//}
